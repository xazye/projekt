<?php $page='view'; require_once "./pieces/header.php"?>
</head>
<body>
    <?php require_once './pieces/nav.php' ?>  
    <main>
        <div class="view">
            <?php 
                require_once './pieces/db_conection.php';
                $sql = "SELECT * FROM images WHERE imgname=:image LIMIT 1";
                $stmt = $c ->prepare($sql);
                $stmt->execute(['image' => $_GET["image"]]);

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
