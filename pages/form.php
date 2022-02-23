
<?php  $page='form'; require_once "./pieces/header.php"?>
</head>
<body>
    <?php require_once './pieces/nav.php'  // add secure $_Get handlind for errors?>  
    <main>
        <div class="formulpoad">
            <form action="upload.php" autocomplete="off" method="post" enctype="multipart/form-data">
                <div class="logo">Select image/gif to <span>Upload</span></div>
                <input type="hidden" name="MAX_FILE_SIZE" value="4194304">
                <label >Choose File
                <input type="file" name="fileToUpload" id="fileToUpload">
                </label>
                <label>Upload
                <input type="submit" name="submit" value="Upload image" >
                </label>
            </form>
            <script>
               (() => {
                    const input = document.getElementById('fileToUpload')
                    input.addEventListener('change', changeimg)

                    function changeimg(e)
                    {
                        const iddd = URL.createObjectURL(input.files.item(0))
                        // change the background image of pseudo elemt ::before
                        document.getElementsByClassName("formulpoad")[0].style.setProperty('--myimage',`url(${iddd})`);
                    }
                })();
            </script>
        </div>
    </main> 
</body>
</html>