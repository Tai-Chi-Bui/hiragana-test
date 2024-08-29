document.addEventListener("DOMContentLoaded", function () {
    const startQuizButton = document.getElementById("startQuiz");
    const quizContainer = document.getElementById("quizContainer");
    const questionContainer = document.getElementById("questionContainer");
    const nextQuestionButton = document.getElementById("nextQuestion");
    const resultContainer = document.getElementById("resultContainer");
    const scoreElement = document.getElementById("score");
    const gradeElement = document.getElementById("grade");
    const restartQuizButton = document.getElementById("restartQuiz");
    const progressTableBody = document.getElementById("progressTableBody");

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const hiraganaData = {
        'a-group': [
            { character: 'あ', sound: 'a', audio: '001_a' },
            { character: 'い', sound: 'i', audio: '002_i' },
            { character: 'う', sound: 'u', audio: '003_u' },
            { character: 'え', sound: 'e', audio: '004_e' },
            { character: 'お', sound: 'o', audio: '005_o' }
        ],
        'k-group': [
            { character: 'か', sound: 'ka', audio: '006_ka' },
            { character: 'き', sound: 'ki', audio: '007_ki' },
            { character: 'く', sound: 'ku', audio: '008_ku' },
            { character: 'け', sound: 'ke', audio: '009_ke' },
            { character: 'こ', sound: 'ko', audio: '010_ko' }
        ],
        's-group': [
            { character: 'さ', sound: 'sa', audio: '011_sa' },
            { character: 'し', sound: 'shi', audio: '012_shi' },
            { character: 'す', sound: 'su', audio: '013_su' },
            { character: 'せ', sound: 'se', audio: '014_se' },
            { character: 'そ', sound: 'so', audio: '015_so' }
        ],
        't-group': [
            { character: 'た', sound: 'ta', audio: '016_ta' },
            { character: 'ち', sound: 'chi', audio: '017_chi' },
            { character: 'つ', sound: 'tsu', audio: '018_tsu' },
            { character: 'て', sound: 'te', audio: '019_te' },
            { character: 'と', sound: 'to', audio: '020_to' }
        ],
        'n-group': [
            { character: 'な', sound: 'na', audio: 'audio/na.mp3' },
            { character: 'に', sound: 'ni', audio: 'audio/ni.mp3' },
            { character: 'ぬ', sound: 'nu', audio: 'audio/nu.mp3' },
            { character: 'ね', sound: 'ne', audio: 'audio/ne.mp3' },
            { character: 'の', sound: 'no', audio: 'audio/no.mp3' }
        ],
        'h-group': [
            { character: 'は', sound: 'ha', audio: 'audio/ha.mp3' },
            { character: 'ひ', sound: 'hi', audio: 'audio/hi.mp3' },
            { character: 'ふ', sound: 'fu', audio: 'audio/fu.mp3' },
            { character: 'へ', sound: 'he', audio: 'audio/he.mp3' },
            { character: 'ほ', sound: 'ho', audio: 'audio/ho.mp3' }
        ],
        'm-group': [
            { character: 'ま', sound: 'ma', audio: 'audio/ma.mp3' },
            { character: 'み', sound: 'mi', audio: 'audio/mi.mp3' },
            { character: 'む', sound: 'mu', audio: 'audio/mu.mp3' },
            { character: 'め', sound: 'me', audio: 'audio/me.mp3' },
            { character: 'も', sound: 'mo', audio: 'audio/mo.mp3' }
        ],
        'y-group': [
            { character: 'や', sound: 'ya', audio: 'audio/ya.mp3' },
            { character: 'ゆ', sound: 'yu', audio: 'audio/yu.mp3' },
            { character: 'よ', sound: 'yo', audio: 'audio/yo.mp3' }
        ],
        'r-group': [
            { character: 'ら', sound: 'ra', audio: 'audio/ra.mp3' },
            { character: 'り', sound: 'ri', audio: 'audio/ri.mp3' },
            { character: 'る', sound: 'ru', audio: 'audio/ru.mp3' },
            { character: 'れ', sound: 're', audio: 'audio/re.mp3' },
            { character: 'ろ', sound: 'ro', audio: 'audio/ro.mp3' }
        ],
        'w-group': [
            { character: 'わ', sound: 'wa', audio: 'audio/wa.mp3' },
            { character: 'を', sound: 'wo', audio: 'audio/wo.mp3' }
        ],
        'n-character': [
            { character: 'ん', sound: 'n', audio: 'audio/n.mp3' }
        ],
        'g-group': [
            { character: 'が', sound: 'ga', audio: 'audio/ga.mp3' },
            { character: 'ぎ', sound: 'gi', audio: 'audio/gi.mp3' },
            { character: 'ぐ', sound: 'gu', audio: 'audio/gu.mp3' },
            { character: 'げ', sound: 'ge', audio: 'audio/ge.mp3' },
            { character: 'ご', sound: 'go', audio: 'audio/go.mp3' }
        ],
        'z-group': [
            { character: 'ざ', sound: 'za', audio: 'audio/za.mp3' },
            { character: 'じ', sound: 'ji', audio: 'audio/ji.mp3' },
            { character: 'ず', sound: 'zu', audio: 'audio/zu.mp3' },
            { character: 'ぜ', sound: 'ze', audio: 'audio/ze.mp3' },
            { character: 'ぞ', sound: 'zo', audio: 'audio/zo.mp3' }
        ],
        'd-group': [
            { character: 'だ', sound: 'da', audio: 'audio/da.mp3' },
            { character: 'ぢ', sound: 'ji', audio: 'audio/ji.mp3' },
            { character: 'づ', sound: 'zu', audio: 'audio/zu.mp3' },
            { character: 'で', sound: 'de', audio: 'audio/de.mp3' },
            { character: 'ど', sound: 'do', audio: 'audio/do.mp3' }
        ],

        'b-group': [
            { character: 'ば', sound: 'ba', audio: 'audio/ba.mp3' },
            { character: 'び', sound: 'bi', audio: 'audio/bi.mp3' },
            { character: 'ぶ', sound: 'bu', audio: 'audio/bu.mp3' },
            { character: 'べ', sound: 'be', audio: 'audio/be.mp3' },
            { character: 'ぼ', sound: 'bo', audio: 'audio/bo.mp3' }
        ],
        'p-group': [
            { character: 'ぱ', sound: 'pa', audio: 'audio/pa.mp3' },
            { character: 'ぴ', sound: 'pi', audio: 'audio/pi.mp3' },
            { character: 'ぷ', sound: 'pu', audio: 'audio/pu.mp3' },
            { character: 'ぺ', sound: 'pe', audio: 'audio/pe.mp3' },
            { character: 'ぽ', sound: 'po', audio: 'audio/po.mp3' }
        ],
        'ky-group': [
            { character: 'きゃ', sound: 'kya', audio: 'audio/kya.mp3' },
            { character: 'きゅ', sound: 'kyu', audio: 'audio/kyu.mp3' },
            { character: 'きょ', sound: 'kyo', audio: 'audio/kyo.mp3' }
        ],
        'sh-group': [
            { character: 'しゃ', sound: 'sha', audio: 'audio/sha.mp3' },
            { character: 'しゅ', sound: 'shu', audio: 'audio/shu.mp3' },
            { character: 'しょ', sound: 'sho', audio: 'audio/sho.mp3' }
        ],
        'ch-group': [
            { character: 'ちゃ', sound: 'cha', audio: 'audio/cha.mp3' },
            { character: 'ちゅ', sound: 'chu', audio: 'audio/chu.mp3' },
            { character: 'ちょ', sound: 'cho', audio: 'audio/cho.mp3' }
        ],
        'ny-group': [
            { character: 'にゃ', sound: 'nya', audio: 'audio/nya.mp3' },
            { character: 'にゅ', sound: 'nyu', audio: 'audio/nyu.mp3' },
            { character: 'にょ', sound: 'nyo', audio: 'audio/nyo.mp3' }
        ],
        'hy-group': [
            { character: 'ひゃ', sound: 'hya', audio: 'audio/hya.mp3' },
            { character: 'ひゅ', sound: 'hyu', audio: 'audio/hyu.mp3' },
            { character: 'ひょ', sound: 'hyo', audio: 'audio/hyo.mp3' }
        ],
        'my-group': [
            { character: 'みゃ', sound: 'mya', audio: 'audio/mya.mp3' },
            { character: 'みゅ', sound: 'myu', audio: 'audio/myu.mp3' },
            { character: 'みょ', sound: 'myo', audio: 'audio/myo.mp3' }
        ],
        'ry-group': [
            { character: 'りゃ', sound: 'rya', audio: 'audio/rya.mp3' },
            { character: 'りゅ', sound: 'ryu', audio: 'audio/ryu.mp3' },
            { character: 'りょ', sound: 'ryo', audio: 'audio/ryo.mp3' }
        ],
        'obsolete-group': [
            { character: 'ゐ', sound: 'wi', audio: 'audio/wi.mp3' },
            { character: 'ゑ', sound: 'we', audio: 'audio/we.mp3' }
        ]
    };

    startQuizButton.addEventListener("click", function () {
        const selectedGroups = Array.from(document.getElementById("hiraganaGroups").selectedOptions).map(option => option.value);
        
        // Ensure there are enough questions available
        if (selectedGroups.some(group => !hiraganaData[group] || hiraganaData[group].length === 0)) {
            alert("Please select valid groups with sufficient characters.");
            return;
        }

        questions = generateQuestions(selectedGroups);
        if (questions.length === 0) {
            alert("Not enough characters to generate a quiz. Please select more groups.");
            return;
        }

        currentQuestionIndex = 0;
        score = 0;

        quizContainer.classList.remove("hidden");
        startQuizButton.parentElement.classList.add("hidden");
        resultContainer.classList.add("hidden");

        initializeProgressTable(questions.length);
        showQuestion();
    });

    nextQuestionButton.addEventListener("click", function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    restartQuizButton.addEventListener("click", function () {
        startQuizButton.parentElement.classList.remove("hidden");
        quizContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");
        progressTableBody.innerHTML = ""; // Reset progress table
    });

    function generateQuestions(selectedGroups) {
        let allQuestions = [];
        selectedGroups.forEach(group => {
            if (hiraganaData[group]) {
                allQuestions = allQuestions.concat(hiraganaData[group]);
            }
        });

        if (allQuestions.length === 0) return [];

        let questions = [];
        allQuestions.forEach(item => {
            questions.push({ question: item, type: "character" });
            questions.push({ question: item, type: "sound" });
        });

        return questions.sort(() => Math.random() - 0.5);
    }

    function initializeProgressTable(totalQuestions) {
        for (let i = 0; i < totalQuestions; i++) {
            const row = document.createElement("tr");
            const cell1 = document.createElement("td");
            cell1.textContent = i + 1;
            const cell2 = document.createElement("td");
            cell2.textContent = "Pending";
            row.appendChild(cell1);
            row.appendChild(cell2);
            progressTableBody.appendChild(row);
        }
    }

    function updateProgressTable(status) {
        const row = progressTableBody.children[currentQuestionIndex];
        row.cells[1].textContent = status;
        row.cells[1].style.color = status === "Correct" ? "blue" : "red";
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<h2>${currentQuestion.type === "character" ? currentQuestion.question.sound : currentQuestion.question.character}</h2>`;
        
        const choices = generateChoices(currentQuestion.question, questions.map(q => q.question), currentQuestion.type);
        choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.onclick = () => handleAnswer(button, choice);
            questionContainer.appendChild(button);
        });

        nextQuestionButton.classList.add("hidden");
    }

    function generateChoices(correctQuestion, allQuestions, type) {
        let correctAnswer = correctQuestion[type === "character" ? "character" : "sound"];
        let choices = [correctAnswer];
        
        let choicesSet = new Set(choices);
        while (choicesSet.size < Math.min(5, allQuestions.length/2)) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            const randomChoice = allQuestions[randomIndex][type === "character" ? "character" : "sound"];
            if (!choicesSet.has(randomChoice)) {
                choicesSet.add(randomChoice);
            }
        }

        choices = Array.from(choicesSet).sort(() => Math.random() - 0.5);
        return choices;
    }

    function handleAnswer(button, selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = (currentQuestion.type === "character" && selectedAnswer === currentQuestion.question.character) ||
                          (currentQuestion.type === "sound" && selectedAnswer === currentQuestion.question.sound);

        const allButtons = questionContainer.querySelectorAll("button");
        allButtons.forEach(btn => btn.disabled = true);

        if (isCorrect) {
            score++;
            button.classList.add("correct");
            button.style.color = "blue";
            button.textContent += " - Correct!";
            updateProgressTable("Correct");
        } else {
            button.classList.add("incorrect");
            button.style.color = "red";
            button.textContent += " - Incorrect!";
            const correctAnswer = currentQuestion.type === "character" ? currentQuestion.question.character : currentQuestion.question.sound;
            const correctAnswerElement = document.createElement("p");
            correctAnswerElement.textContent = `Correct Answer: ${correctAnswer}`;
            correctAnswerElement.style.color = "blue";
            questionContainer.appendChild(correctAnswerElement);
            updateProgressTable("Incorrect");
        }

        nextQuestionButton.classList.remove("hidden");
    }

    function showResults() {
        scoreElement.textContent = `${score} / ${questions.length}`;
        gradeElement.textContent = calculateGrade(score, questions.length);
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
    }

    function calculateGrade(score, total) {
        const percentage = (score / total) * 100;
        if (percentage >= 90) return "Excellent!";
        if (percentage >= 70) return "Good!";
        if (percentage >= 50) return "Needs Improvement.";
        return "Better luck next time!";
    }
});
