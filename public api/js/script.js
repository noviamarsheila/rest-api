// buat function untuk menampilkan daftar movie yang ingin ditampilkan
function searchMovie() {
	// kosongkan div tempat untuk menampung daftar movie
	$("#movie-list").html("");

	// mengambil data dari public api OMDb API
	$.ajax({
		url: "http://www.omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "dc106a55",
			s: $("#search-input").val(),
		},
		// ketika sukses melakukan pencarian maka tampilkan data
		success: function (result) {
			if (result.Response == "True") {
				let movies = result.Search;
				$.each(movies, function (i, data) {
					$("#movie-list").append(`
                    <div class="col-md-4">
                    <div class="card mb-3" style="width: 18rem;">
                        <img src="${data.Poster}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                         </div>
                    </div>
                    </div>
                    `);
					$("#search-input").val("");
				});
				// ketika salah/ tidak ada data maka tampilkan pesan kesalahan
			} else {
				$("#movie-list").html(`
                <div class="col">
                    <h1>Movie Not Found!</h1>
                </div>
                `);
			}
		},
	});
}

// ketika tombol cari diklik maka tampilkan data yang ada dalam function movie
$("#search-button").on("click", function () {
	searchMovie();
});

// ketika ingin menampilkan data tanpa klik tombol
// melainkan menggunakan tombol enter pada keyboard
$("#search-input").on("keyup", function (e) {
	// jika tombol enter diklik maka lakukan pencarian data
	// kode tombol enter adalah 13
	if (e.keyCode === 13) {
		searchMovie();
	}
});

// pada saat tombol see detail diklik
$("#movie-list").on("click", ".see-detail", function () {
	$.ajax({
		url: "http://www.omdbapi.com",
		type: "get",
		dataType: "json",
		data: {
			apikey: "dc106a55",
			i: $(this).data("id"),
		},
		success: function (i, movie) {
			if (movie.Response === "True") {
				$("#modal-body").html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src=${movie.Poster} class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>Judul : ${movie.Title}</h3></li>
                                <li class="list-group-item">${movie.Released}</li>
                                <li class="list-group-item">A third item</li>
                                <li class="list-group-item">A fourth item</li>
                                <li class="list-group-item">And a fifth one</li>
                            </ul>
                        </div>
                    </div>
                </div>               
                `);
			}
		},
	});
});
