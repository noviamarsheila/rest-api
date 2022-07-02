<?php 

// $mahasiswa = [
//     [
//         "nama" => "Sheila",
//         "nim" => "202151082",
//         "email" => "noviasheila123@gmail.com"
//     ],
//     [
//         "nama" => "Berlian",
//         "nim" => "202151083",
//         "email" => "berlian12@gmail.com"
//     ]

// ];


// ambil dari database
$dbh = new PDO('mysql:host=localhost;dbname=phpdasar','root','');
$db = $dbh->prepare('SELECT * FROM mahasiswa');
$db->execute();
$mahasiswa = $db->fetchAll(PDO::FETCH_ASSOC);

// ubah jd json
$data = json_encode($mahasiswa);
echo $data;


?>