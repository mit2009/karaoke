currentVerse = 0;
highlightedLine = 0;
LINE_HEIGHT = 86;
SHIFT = 100;

function init() {
  generateCurrentVerse();
  nextStep();
}

function generateCurrentVerse() {
  lines = lyrics[currentVerse]
  textStyle = "";
  generatedLyrics = "";

  for (l in lines) {
    words = lines[l].split(' ');

    // start of the line
    generatedLyrics += `<div class="text-line" id ="${l}">`;

    for (i in words) {
      word = words[i];
      let classes = word.split('|')
      word = classes.shift()
      generatedLyrics += `<span data='${classes}' class='${classes.join(' ')}'>${word}</span>`
    }

    generatedLyrics += '</div>';
  }
  $('.text-container').html(generatedLyrics);
}

function nextStep() {
  if (highlightedLine >= lyrics[currentVerse].length) {
    currentVerse++;

    if (currentVerse >= lyrics.length) {
      $('.dot').stop().animate({
        top: 1950,
      }, 100, function () {
        console.log('dot leaves forever');
      });
      $('#' + (highlightedLine - 1)).removeClass('highlight');
      return;
    }

    highlightedLine = 0;

    $('.dot').stop().animate({
      top: 1 * LINE_HEIGHT - SHIFT,
      opacity: 0.8,
    }, 100, function () {
      console.log('start highlight')
    });

    // to correct any awko taco jumps >:
    setTimeout(function () {
      generateCurrentVerse();
    }, 50);
  } else {
    setTimeout(function () {
      $('#' + (highlightedLine)).children().each(function () {
        classes = $(this).attr('data');
        if (classes) {
          classes = classes.split(',')
          for (let i in classes) {
            $(this).addClass(`${classes[i]}-after`)
          }
        }
      });

      $(`#${highlightedLine - 1}`).removeClass('highlight');
      $(`#${highlightedLine}`).addClass('highlight');

      highlightedLine++;

    }, 50);

    $('.dot').animate({
      top: (highlightedLine + 1) * LINE_HEIGHT - SHIFT
    }, 50)

  }
}

$(function () {
  init();
  $('body').keyup(function (e) {
    if (e.keyCode == 32 || e.keyCode == 40) {
      // user has pressed backspace
      nextStep();
    }
    if (e.keyCode == 38) {
      // this isn't implemented lol
      // previousStep();
    }
  });
});