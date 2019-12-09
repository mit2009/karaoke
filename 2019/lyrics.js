
    const teamColors = {
        1: ['#FDD900', '#000000', 'yellow'],
        2: ['#EC1C24', '#ffffff', 'red'],
        3: ['#3675BB', '#ffffff', 'blue'],
        4: ['#F27421', '#ffffff', 'orange'],
        5: ['#4FB648', '#ffffff', 'green'],
        6: ['#EF4681', '#ffffff', 'pink'],
        7: ['#8A4C9D', '#ffffff', 'purple'],
        8: ['#B2B4B6', '#000000', 'silver'],
      }
  
      currentVerse = 0;
      highlightedLine = 0;
      LINE_HEIGHT = 86;
      SHIFT = 100;
  
      function generateCurrentVerse() {
        lines = lyrics[currentVerse].split('|');
        textStyle = "";
        generatedLyrics = "";
  
        for (l in lines) {
          words = lines[l].split(' ');
  
          // start of the line
          generatedLyrics += '<div class="text-line" id ="' + l + '">';
  
          for (i in words) {
            textStyle = "";
            word = words[i];
            for (j in teamColors) {
              if (words[i].slice(-1) == (j).toString()) {
                //'class="boxy" ' +
                textStyle = "data-color=\"" + teamColors[j][0] + "\" data-colorname=\"" + teamColors[j][2] + "\" data-textcolor=\"" + teamColors[j][1] + "\" class=\"colorful\"";
                word = word.substring(0, word.length - 1);
              }
            }

            // largeee!
            if (words[i].indexOf('+') > 0) {
              word = word.substring(0, word.length - 1)
              textStyle = `
              data-size="bum"`;
            }
            
            // largeee!
            if (words[i].indexOf('#') > 0) {
              word = word.substring(0, word.length - 1)
              textStyle = `
              data-size="large" 
              style="
                font-size: 150px; 
                margin-left: -15px;"`;
            }

            // LARGERRRRRRR!
            if (words[i].indexOf('%') > 0) {
                word = word.substring(0, word.length - 1)
                textStyle = `
                data-size="larger" 
                style="
                  font-size: 200px; 
                  margin-left: -20px;"
                  position: relative;
                  top: 10px;`;
              }
  
            if (textStyle) {
              generatedLyrics += "<span " + textStyle + ">" + word + "</span>"
            } else {
              generatedLyrics += "<span>" + word + "</span>";
            }
          }
  
          generatedLyrics += '</div>';
        }
        $('.text-container').html(generatedLyrics);
      }
  
  
      function init() {
        generateCurrentVerse();
        nextStep();

        try {
            if (sweetCaroline) {
                sweetCarolineSpecial();
            }
        } catch {};
      }
  
      function getRotation($elem) {
        var el = $elem[0]
        var st = window.getComputedStyle(el, null);
        var tr =
          st.getPropertyValue("transform")
  
        if (tr !== "none") {
  
          // With rotate(30deg)...
          // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
          console.log('Matrix: ' + tr);
  
          // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
  
          var values = tr.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var c = values[2];
          var d = values[3];
  
          var scale = Math.sqrt(a * a + b * b);
  
          console.log('Scale: ' + scale);
  
          // arc sin, convert from radians to degrees, round
          var sin = b / scale;
          // next line works for 30deg but not 130deg (returns 50);
          // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
          var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  
          console.log('Rotate: ' + angle + 'deg');
  
          return angle
        } else {
          return 0
        }
  
      }
  
      function rotateMallow() {
        currentDeg = getRotation($('.dot'));
        $({ deg: currentDeg }).animate({ deg: currentDeg + (Math.random() * 360 - 180) }, {
          duration: 100,
          step: function (now) {
            $('.dot').css({
              transform: "rotate(" + now + "deg)"
            });
          }
        });
      }
      
      function generateMallow() {
        $(".dot")
        .removeClass()
        .addClass("dot");

        try {
            if (fixedColor !== undefined) {
                $(".dot").addClass("mallow-" + fixedColor);
            }
        } catch {};
      }

      function sweetCarolineSpecial() {
        spacing = 100;
        units = 1920/spacing;
        
        for (i = 0; i < units; i ++) {
            mallowColor = teamColors[i%8+1][2]
            $scMallow = $(`<div class="sc-mallow mallow-${mallowColor}" style="
                left:${i*spacing}px;
                bottom: -100px;
            "></div>`);
            $(".sweet-caroline-container").append($scMallow)
        }    
      }

      function updateSweetCarolineSpecial(c) {
          $(".sc-mallow").each(function() {
            if (c === 0) {
                topAdjust = -150;
                scale = 1;
                left = 0;
            } else if (c === 1) {
                topAdjust = Math.floor(Math.random()*100-50);
                scale = 1;
                left = Math.random() * 10 - 5;
            } else if (c === 2) {
                topAdjust = Math.floor(Math.random()*200);
                scale = 2;
                left = Math.random() * 80 - 25;
            } else if (c === 3) {
                topAdjust = Math.floor(Math.random()*800+50);
                scale = 4;
                left = Math.random() * 100 - 50;
            }
            $(this).removeClass("size-2")
              .addClass("sc-mallow")
              .addClass("size-"+c)
              .css({
                bottom: topAdjust,
                transform: `scale(${scale}) translateX(${left}px) rotate(${Math.floor(Math.random()*360)}deg)`
              })
            })
      }

      function nextStep() {
        if (highlightedLine >= lyrics[currentVerse].split('|').length) {
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
  
          updateSweetCarolineSpecial(0);
          generateMallow();
          
          $('.dot').stop().animate({
            top: 1 * LINE_HEIGHT - SHIFT,
            opacity: 0.8,
          }, 100, function () {
            console.log('start highlight')
          });
  
          rotateMallow();
  
          // to correct any awko taco jumps >:
          setTimeout(function () {
            generateCurrentVerse();
          }, 50);
  
  
        } else {
          setTimeout(function () {
            // loop through children
            mallowColorName = '';
            $('#' + (highlightedLine)).children().each(function () {
              color = $(this).data('color');
              textcolor = $(this).data('textcolor');
              colorname = $(this).data('colorname');
                
              size = $(this).data('size');
              if (size === 'bum') {
                updateSweetCarolineSpecial(1);
              } else if (size === 'large') {
                updateSweetCarolineSpecial(2);
              } else if (size === 'larger') {
                updateSweetCarolineSpecial(3);
              }

              if (colorname !== undefined) {
                mallowColorName = colorname;
              };
  
              $(this).css('backgroundColor', color);
              $(this).css('color', textcolor);
              if ($(this).hasClass("colorful")) {
                $(this).css('padding-left', 20);
                $(this).css('padding-right', 20);
              }
            });
  
  
            $('#' + (highlightedLine - 1)).removeClass('highlight');
            $('#' + (highlightedLine)).addClass('highlight');
  
            highlightedLine++;

             generateMallow();
  
            $('.dot')
              .addClass('mallow')
              .addClass('mallow-' + mallowColorName)
          }, 50);
  
          $('.dot').animate({
            top: (highlightedLine + 1) * LINE_HEIGHT - SHIFT
          }, 50)
          rotateMallow();
  
        }
      }
  
      $(function () {
        init();
        $('body').keyup(function (e) {
          if (e.keyCode == 32 || e.keyCode == 40) {
            // user has pressed backspace
            nextStep()
            // for practicing with time delay
            // setTimeout(nextStep, 500);
          }
          if (e.keyCode == 38) {
            // this isn't implemented lol
            // previousStep();
          }
        });
      });
