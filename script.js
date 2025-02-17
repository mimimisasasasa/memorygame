const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");
const playerTurnDisplay = document.getElementById("player-turn");
const scoreDisplay = document.getElementById("score");
const player1Image = document.getElementById("player1-image");
const player2Image = document.getElementById("player2-image");


let symbols = ["🍎", "🍎", "🍌", "🍌", "🍒", "🍒", "🍇", "🍇", "🍉", "🍉", "🍍", "🍍"];
let shuffledCards = symbols.sort(() => Math.random() - 0.5);

let flippedCards = [];
let matchedPairs = 0;
let playerTurn = 1; // 1Pスタート
let playerScores = { 1: 0, 2: 0 };

// 最初のターン表示
updateTurnDisplay();


// カードを生成
shuffledCards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.textContent = "❓";
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

function flipCard(event) {
    let card = event.target;

// すでに開いたカードをクリックしないようにする
　　if (flippedCards.length >= 2 || card.textContent !== "❓") return;

// カードを表にする
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    // プレイヤー1のカード選択時に画像を大きくする
    if (playerTurn === 1) {
        player1Image.classList.add("enlarged");
    }

     // プレイヤー2のカード選択時に画像を大きくする
    if (playerTurn === 2) {
        player2Image.classList.add("enlarged");
    }


// 2枚めくったら判定
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

// カードの一致をチェックする関数
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        playerScores[playerTurn]++;
        card1.classList.add("matched");
        card2.classList.add("matched");

        flippedCards = [];// リセット


         // 全ペア見つかったらゲーム終了
        if (matchedPairs === symbols.length / 2) {
            message.textContent = `🎉 ゲーム終了！ プレイヤー1: ${playerScores[1]}点, プレイヤー2: ${playerScores[2]}点`;
        }
    } else {
     // 不一致ならカードを裏に戻し、ターン交代
        setTimeout(() => {
            card1.textContent = "❓";
            card2.textContent = "❓";
            flippedCards = [];

        // ターン交代
            playerTurn = playerTurn === 1 ? 2 : 1;
            updateTurnDisplay();
        }, 800);
    }
      // スコア表示更新
    updateScoreDisplay();

     // プレイヤーの画像が大きくなった場合、ターン終了後元に戻す
    if (playerTurn === 2) {
        player1Image.classList.remove("enlarged");
    }
}

// ターン表示を更新する関数
function updateTurnDisplay() {
    playerTurnDisplay.textContent = `プレイヤー ${playerTurn} の番です`;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `プレイヤー1: ${playerScores[1]}点 | プレイヤー2: ${playerScores[2]}点`;
}
