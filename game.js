class Game {

    constructor() {
        this.background = new Background();
        this.group = 0;
        // this.margin = [];
    };


    // createMargin() {

    //     let space = (width / 3);
    //     // console.log(space);
    //     for (let i = 0; i < 3; i++) {
    //         for (let j = 2; j > 0; j--) {

    //             this.margin = [i * space, width - j * space]
    //             console.log(i * space);
    //             console.log(width - j * space);
    //             // console.log(this.margin);
    //             // console.log(i);
    //             // console.log(j);
    //         }
    //     }
    //     console.log(this.margin);
    // };





    setup() {

        this.background.setup();


        //Questions-Array
        this.questionArray = ["What animal species can’t be found in the waters of Attenborough Nature Reserve?", "Question2", "Question3", "Question4", "Question5", "Question6"];

        //Image-Array
        this.imageArray = ["./question_assets/Q1.jpg", "./question_assets/Q2.jpg", "./question_assets/Q3.jpg", "./question_assets/Q4.jpg", "./question_assets/Q5.jpg", "./question_assets/Q6.jpg"];



        //x-corrdinates for the positioning of the bubbles
        let x1 = random(90, (width / 3) - 90);
        let x2 = random((width / 3) + 90, (width / 3) * 2 - 90);
        let x3 = random((width / 3) * 2 + 90, width - 90);


        //Level 1
        let bubble1A = new Bubble('Giraffe', false, x1, 1, "margin");
        let bubble1B = new Bubble('Cow', false, x2, 1, "margin");
        let bubble1C = new Bubble('Bird', true, x3, 1, "margin");

        let bubble2A = new Bubble('Ant', false, x1, 1, "margin");
        let bubble2B = new Bubble('Bug', false, x2, 1, "margin");
        let bubble2C = new Bubble('Sugar', true, x3, 1, "margin");

        //Level 2
        let bubble3A = new Bubble('answer', false, x1, 2, "margin");
        let bubble3B = new Bubble('answerB', false, x2, 2, "margin");
        let bubble3C = new Bubble('answerB', true, x3, 2, "margin");

        let bubble4A = new Bubble('answer', false, x1, 2, "margin");
        let bubble4B = new Bubble('answerB', false, x2, 2, "margin");
        let bubble4C = new Bubble('answerB', true, x3, 2, "margin");

        //Level 3
        let bubble5A = new Bubble('answer', false, x1, 3, "margin");
        let bubble5B = new Bubble('answerB', false, x2, 3, "margin");
        let bubble5C = new Bubble('answerB', true, x3, 3, "margin");

        let bubble6A = new Bubble('answer', false, x1, 3, "margin");
        let bubble6B = new Bubble('answerB', false, x2, 3, "margin");
        let bubble6C = new Bubble('answerB', true, x3, 3, "margin");


        this.bubblesArray = [
            [bubble1A, bubble1B, bubble1C],
            [bubble2A, bubble2B, bubble2C],
            [bubble3A, bubble3B, bubble3C],
            [bubble4A, bubble4B, bubble4C],
            [bubble5A, bubble5B, bubble5C],
            [bubble6A, bubble6B, bubble6C],

        ];

        // this.bubblesArray = [
        //     {
        //         bubbles:  [bubble1A, bubble1B, bubble1C],
        //         image: "./question_assets/Q1.jpg",
        //         question: "Question1"
        //     },
        //     {
        //         bubbles:  [bubble2A, bubble2B, bubble2C],
        //         image: "....",
        //         question: "Question2"
        //     },
        // ];

        this.bubbles = [...this.bubblesArray];

        //Calculate possible points (each correct answer is worth one point)
        possiblePoints = this.bubblesArray.length;

    };



    gameOver() {

        //Show game over display
        document.getElementById("question-image").src = `./question_assets/GameOver.jpg`;
        document.querySelector(".question h2").innerText = "Game Over";

        //Display message "scored points out of possible points"
        if (totalScore <= 0) {
            document.querySelector(".question-text").innerText = `${totalScore} from ${possiblePoints} points. You still have a lot of exploring to do!`;
        } else if (totalScore === 1) {
            document.querySelector(".question-text").innerText = `Nice try! You scored ${totalScore} of ${possiblePoints} points. You still have a lot of exploring to do!`;
        } else if (totalScore >= 0 && totalScore < possiblePoints / 2) {
            document.querySelector(".question-text").innerText = `Nice try! You scored ${totalScore} out of ${possiblePoints} points. Time to explore the underwater-world further!`;
        } else if (totalScore <= possiblePoints / 3 && totalScore < possiblePoints / 4) {
            document.querySelector(".question-text").innerText = `Well done! You've obviously been PondDipping before! You scored ${totalScore} out of ${possiblePoints} points.`;
        } else if (totalScore <= possiblePoints / 4 && totalScore < possiblePoints) {
            document.querySelector(".question-text").innerText = `Great Job! You really know Attenborough's underwater-world! You scored ${totalScore} out of ${possiblePoints} points.`;
        } else if (totalScore === possiblePoints) {
            document.querySelector(".question-text").innerText = `Tremendous - You're a true PondDipping-Pro! You scored all ${possiblePoints} points!`;
        } else {
            document.querySelector(".question-text").innerText = `You scored ${totalScore} out of ${possiblePoints} points.`;
        }


        backgroundSound.stop();

        noLoop();

    };



    draw() {

        clear();

        this.background.draw();

        //Display correct Image
        document.getElementById("question-image").src = `${this.imageArray[this.group]}`;
        //Display correct Question
        document.querySelector(".question-text").innerText = `${this.questionArray[this.group]}`;

        //Check if there is another nested array left in bubblesArray
        if (this.group >= this.bubblesArray.length) {
            this.gameOver();

            //  Inititate new question round
        } else {
            //Show the three bubbles for the first question
            let groupBubbles = this.bubbles[this.group];
            // when level is 0, it becomes this.bubbles[0]
            for (let j = 0; j < groupBubbles.length; j++) {
                groupBubbles[j].move();
                // if (frameCount % 60 === 0) {
                groupBubbles[j].display();
                // }
            }
        }

    };



    bubbleClick() {
        //Checks whether there is a group left
        const group = this.bubbles[this.group]
        if (!group) return;

        //Initiates clicked function
        for (let i = 0; i < group.length; i++) {
            group[i].clicked(i);
        }

    };


}