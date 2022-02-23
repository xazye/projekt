<?php
    require_once './pieces/db_conection.php';
    $file = $_FILES['fileToUpload'];  
    foreach ($file as $key => $value)
    {
        print "<p>${key} , ${value}</p>";
    } 
try {
    // throw exception if error is not 0
    if ($file['error'])
        {
            $phpFileUploadErrors = array(
            1 => 'The uploaded file exceeds the upload_max_filesize directive',
            2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
            3 => 'The uploaded file was only partially uploaded',
            4 => 'No file was uploaded',
            6 => 'Missing a temporary folder',
            7 => 'Failed to write file to disk.',
            8 => 'A PHP extension stopped the file upload.',
        );
            throw new RuntimeException($phpFileUploadErrors[$file['error']]);
        }
       
        // if size is > 4mb throw it 
        //in the trash along with the person that sent it
        if ($file['size'] > 4194304)
        {
            throw new RuntimeException('Exceeded filesize limit.');
        }

        // check MIME type 
        // cuz u never now what these people be sending
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        //get the extesnion for save in database
        $imgtype=$finfo ->file($file['tmp_name']);
        if (
            false === $ext = array_search(
                $imgtype,
                array(
                    'jpg' => 'image/jpeg',
                    'png' => 'image/png',
                    'gif' => 'image/gif',
                    'webp' => 'image/webp',
                ),
                true
            ))
        {
            throw new RuntimeException('Invalid file format.');
        }

        //name it uniquely
        // we don't want to use 'name' without any validation
        // $ext is definded in if above 

        // for unkown to me reaseons i have to use $_FILES instead of my $file
        $newname=sprintf('%s.%s',sha1_file( $_FILES['fileToUpload']['tmp_name']),$ext);

        // it has to coded like that so it can survie the transort.
        // changes 01010 code to chars.
        $imgData = pg_escape_bytea(base64_encode(file_get_contents($_FILES['fileToUpload']['tmp_name'])));
        //prepare the query and send it
        $sql = "INSERT INTO images (imgname,img,type,public)
            VALUES (:newname,:imgData,:imgtype,true)";
        $stmt = $c ->prepare($sql);
        $stmt->execute(['newname' => $newname, 'imgData' => $imgData, 'imgtype' => $imgtype]);
        
        header("Location:view.php?image=".$newname);
        die();

        echo '<br>File uploaded successfully';
	}
    catch (RuntimeException $e)
    {
        $error= $e -> getMessage();
        header("Location:form.php?error=${$error}");
        die();
        
    }
?>