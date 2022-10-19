"use strict";
window.onload = init;
let puzzleCells;
let cellBackground;
let cursorType;
function init() {
  document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
  document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
  let puzzleButtons = document.getElementsByClassName("puzzles");
   for(let i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = swapPuzzle;
   }
   setupPuzzle();
   document.addEventListener("mouseup", endBackground);
   document.getElementById("solve").addEventListener("click", function(){
      for(let i = 0; i < puzzleCells.length; i++) {
         puzzleCells[i].style.backgroundColor = "";
      }
   });
}
function swapPuzzle(e) {
   let puzzleID = e.target.id;
  let puzzleTitle = e.target.value;
   document.getElementById("puzzleTitle").innerHTML = puzzleTitle;
   switch(puzzleID) {
      case "puzzle1":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle1Hint, puzzle1Rating, puzzle1);
         break;
      case "puzzle2":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle2Hint, puzzle2Rating, puzzle2);
         break;
      case "puzzle3":
         document.getElementById("puzzle").innerHTML = drawPuzzle(puzzle3Hint, puzzle3Rating, puzzle3);
         break;
   }setupPuzzle();
}
function setupPuzzle() {
  puzzleCells = document.querySelectorAll("table#hanjieGrid td");
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].style.backgroundColor = "rgb(233, 207, 29)";
      puzzleCells[i].onmousedown = setBackground;
      puzzleCells[i].style.cursor = "url('jpf_pencil.png'), pointer";
   }
   let filled = document.querySelectorAll("table#hanjieGrid td.filled");
   let empty = document.querySelectorAll("table#hanjieGrid td.empty");
   document.getElementById("peek").addEventListener("click", function(){
      for(let i = 0; i < filled.length; i++) {
         if(filled[i].style.backgroundColor === "rgb(255, 255, 255)") {
            filled[i].style.backgroundColor = "rgb(255, 211, 211)";
         }
      }
      for(let i = 0; i < empty.length; i++) {
         if(empty[i].style.backgroundColor === "rgb(101, 101, 101)") {
            empty[i].style.backgroundColor = "rgb(255, 101, 101)";
         }
      }
      setTimeout(function(){
         for(let i = 0; i < puzzleCells.length; i++) {
            if(puzzleCells[i].style.backgroundColor === "rgb(255, 211, 211)") {
               puzzleCells[i].style.backgroundColor = "rgb(255, 255, 255)";
            }
            if(puzzleCells[i].style.backgroundColor === "rgb(255, 101, 101)") {
               puzzleCells[i].style.backgroundColor = "rgb(101, 101, 101)";
            }
         }
      }, 500);
   });
   document.getElementById("hanjieGrid").addEventListener("mouseup", function(){
      let solved = true;
      for(let i = 0; i < puzzleCells.length; i++) {
         if((puzzleCells[i].className === "filled" && puzzleCells[i].style.backgroundColor !== "rgb(101, 101, 101)") || (puzzleCells[i].className === "empty" && puzzleCells[i].style.backgroundColor === "rgb(101, 101, 101)")) {
            solved = false;
            break;
         }
      }
      if(solved) {
         window.alert("Congrats! You solved the puzzle!");
      }
   });
}function setBackground(e){
   if(e.shiftKey) {
      cellBackground = "rgb(233, 207, 29)";
      cursorType = "url('jpf_eraser.png'), cell";
   } else if(e.altKey) {
      cellBackground = "rgb(255, 255, 255)";
      cursorType = "url('jpf_cross.png'), crosshair";
   } else {
      cellBackground = "rgb(101, 101, 101)";
      cursorType = "url('jpf_pencil.png'), pointer";
   }
   e.target.style.backgroundColor = cellBackground;
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].addEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   }
   e.preventDefault();
}
function extendBackground(e) {
   e.target.style.backgroundColor = cellBackground;
}
function endBackground() {
   for(let i = 0; i < puzzleCells.length; i++) {
      puzzleCells[i].removeEventListener("mouseenter", extendBackground);
      puzzleCells[i].style.cursor = cursorType;
   }
function drawPuzzle(hint, rating, puzzle) {
   var htmlString = "";

   var totalRows = puzzle.length;
   var totalCols = puzzle[0].length;
   var rowCount = [];
   var spaceCount;
   for (var i = 0; i < totalRows; i++) {
      rowCount[i]="";
      spaceCount = 0;
      for (var j = 0; j < totalCols; j++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (j === totalCols-1) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
            }
         } else {
            if (spaceCount > 0) {
               rowCount[i] += spaceCount + "&nbsp;&nbsp;";
               spaceCount = 0;
            } 
         }    
      }
   }
   var colCount = [];
   for (var j = 0; j < totalCols; j++) {
      colCount[j]="";
      spaceCount = 0;

      for (var i = 0; i < totalRows; i++) {
         if (puzzle[i][j] === "#") {
            spaceCount++;
            if (i === totalRows-1) {
               colCount[j] += spaceCount + "<br />";
            }
         } else {
            if (spaceCount > 0) {
               colCount[j] += spaceCount + "<br />";
               spaceCount = 0;
            } 
         }    
      }
   }
   htmlString = "<table id='hanjieGrid'>";
   htmlString += "<caption>" + hint + " (" + rating + ")</caption>";
   htmlString += "<tr><th></th>";

   for (var j = 0; j < totalCols; j++) {
      htmlString += "<th class='cols'>" + colCount[j] + "</th>";
   }
   htmlString += "</tr>";
   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr><th class='rows'>&nbsp;" + rowCount[i]+"</th>";
      for (var j = 0; j<totalCols; j++) {
         if (puzzle[i][j] === "#") {
            htmlString += "<td  class='filled'></td>";
         }
         else {
            htmlString += "<td class='empty'></td>";
         }
      }
      htmlString += "</tr>";
   }
   htmlString += "</table>";
   return htmlString;
}