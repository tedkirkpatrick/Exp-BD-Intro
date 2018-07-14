/*
  Javascript code for handouts.
*/

"use strict";

// Declared globally for debugging
var 
  total_points = 0,
  questions,
  container;

function link_to_parents() {
  var last_h2 = null;
  /* Pattern tests true if "question" is one of the classes:
    (0 or more (word followed by 1 or more spaces))
    "question"
    (0 or more (word followed by 1 or more spaces))

    \w does not include '-', so it must be explicitly added to the set
    */
  var question_class = /^([-\w]+\s+)*question(\s+[-\w]+)*\s*$/;

  var containers = document.querySelectorAll(".container");
  container = containers[containers.length-1];
  var divs = container.childNodes;
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].tagName == "H2") {
      last_h2 = divs[i];
      divs[i].points = 0;
    }
    else if (question_class.test(divs[i].className)) {
      divs[i].parent_h2 = last_h2;
    }
  }
}

function process_questions() {
  var total_points_el = document.querySelector(".totalpoints");

  questions = document.querySelectorAll(".question");
  
  for (var i = 0; i < questions.length; i++) {
    var q = questions.item(i);
    var text = q.innerHTML;
    var points = Number(q.getAttribute("points"));
    q.parent_h2.points += points;
    total_points += points;
    q.innerHTML = '<span class="questhead">QUESTION ' + (i+1) + " (" + points + " pts):</span> " + text;
  }

  total_points_el.innerHTML = String(total_points);
}

function process_h2() {
  var h2s = document.querySelectorAll("H2");
  for (var i = 0; i < h2s.length; i++) {
    if (h2s[i].points > 0) {
      var h = h2s[i],
        text = h.innerHTML;
      h.innerHTML = text + " (" + h.points + " pts)";
    }
  }
}

link_to_parents();
process_questions();
process_h2();