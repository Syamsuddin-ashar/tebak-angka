// Menambahkan event listener untuk tombol 'Mulai Permainan' yang memanggil fungsi startGame
document.getElementById('start-game').addEventListener('click', startGame);
// Menambahkan event listener untuk tombol 'Tebak' yang memanggil fungsi submitGuess
document.getElementById('submit-guess').addEventListener('click', submitGuess);
// Menambahkan event listener untuk tombol 'Main Lagi' yang memanggil fungsi resetGame
document.getElementById('play-again').addEventListener('click', resetGame);

// Deklarasi variabel global yang digunakan dalam permainan
let targetNumber, maxRange, remainingAttempts, timer, totalGuesses;
let timeRemaining; // Menyimpan waktu yang tersisa
let countdown; // Menyimpan interval timer

// Fungsi untuk memulai permainan
function startGame() {
    // Mengambil nilai rentang angka, jumlah kesempatan, dan waktu dari input pengguna
    maxRange = parseInt(document.getElementById('range').value);
    remainingAttempts = parseInt(document.getElementById('attempts').value);
    timeRemaining = parseInt(document.getElementById('timer').value);

    // Menghasilkan angka acak yang akan ditebak oleh pemain
    targetNumber = Math.floor(Math.random() * maxRange) + 1;
    totalGuesses = 0; // Menginisialisasi total tebakan menjadi 0

    // Mengupdate tampilan dengan rentang angka, jumlah kesempatan, dan waktu yang tersisa
    document.getElementById('max-range').innerText = maxRange;
    document.getElementById('remaining-attempts').innerText = remainingAttempts;
    document.getElementById('time-remaining').innerText = timeRemaining;

    // Menyembunyikan pengaturan permainan dan menampilkan bagian permainan aktif
    document.getElementById('game-setup').classList.add('hidden');
    document.getElementById('game-play').classList.remove('hidden');

    // Memulai timer yang akan mengurangi waktu setiap detik
    countdown = setInterval(updateTimer, 1000);
}

// Fungsi untuk memproses tebakan pemain
function submitGuess() {
    // Mengambil nilai tebakan dari input pengguna
    const guess = parseInt(document.getElementById('guess-input').value);
    totalGuesses++; // Menambah total tebakan

    // Memeriksa apakah tebakan pemain sama dengan angka target
    if (guess === targetNumber) {
        endGame(true); // Jika benar, permainan berakhir dengan kemenangan
    } else {
        remainingAttempts--; // Mengurangi jumlah kesempatan yang tersisa
        document.getElementById('remaining-attempts').innerText = remainingAttempts;

        // Memberikan feedback apakah tebakan terlalu tinggi atau terlalu rendah
        let feedback = guess > targetNumber ? 'Terlalu tinggi!' : 'Terlalu rendah!';
        document.getElementById('feedback').innerText = feedback;

        // Jika kesempatan habis atau waktu habis, permainan berakhir dengan kekalahan
        if (remainingAttempts === 0 || timeRemaining === 0) {
            endGame(false);
        }
    }
}

// Fungsi untuk mengupdate timer setiap detik
function updateTimer() {
    timeRemaining--; // Mengurangi waktu yang tersisa
    document.getElementById('time-remaining').innerText = timeRemaining;

    // Jika waktu habis, hentikan timer dan akhiri permainan
    if (timeRemaining <= 0) {
        clearInterval(countdown);
        endGame(false);
    }
}

// Fungsi untuk mengakhiri permainan
function endGame(isWin) {
    clearInterval(countdown); // Menghentikan timer
    document.getElementById('game-play').classList.add('hidden');
    document.getElementById('game-result').classList.remove('hidden');

    // Menentukan pesan hasil permainan berdasarkan apakah pemain menang atau kalah
    const resultMessage = isWin ? 'Selamat Anda Menebak Dengan Benar!' : `Maaf, Anda Kalah. Angkanya adalah ${targetNumber}.`;
    document.getElementById('result-message').innerText = resultMessage;
    document.getElementById('total-guesses').innerText = totalGuesses; // Menampilkan total tebakan
}

// Fungsi untuk mereset permainan dan mengembalikan ke pengaturan awal
function resetGame() {
    // Mengosongkan input tebakan dan feedback
    document.getElementById('guess-input').value = '';
    document.getElementById('feedback').innerText = '';

    // Menyembunyikan bagian permainan aktif dan hasil, lalu menampilkan pengaturan permainan
    document.getElementById('game-play').classList.add('hidden');
    document.getElementById('game-result').classList.add('hidden');
    document.getElementById('game-setup').classList.remove('hidden');
}
