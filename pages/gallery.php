<?php $page='gallery'; require_once "./pieces/header.php"?>
<link rel="stylesheet" href="../css/index.css">
</head>
<body>
    <?php  require_once './pieces/nav.php' ?>  
    <main>
        <div class="gallery">
            <?php
            require_once './pieces/db_conection.php';
                $sql = "select * from images where public=true";
                $stmt = $c ->prepare($sql);
                $stmt->execute();

                // this doesn't look nice
                //i don't know how i want to do this.
                foreach($stmt as $row)
                {
                    $src = 'data: '.$row[3].';base64,'.stream_get_contents($row[2]);
                    echo '<img src="'.$src.'" >';
                    
                }
            ?>


        </div>

    </main>
    
    
</body>
</html>