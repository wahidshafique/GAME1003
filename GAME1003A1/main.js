$(function () {
  createSlider(".TLOU1 img");
  createSlider(".SSB1 img");
  createSlider(".hearthstone img");
});

function createSlider(selector) {
  var imgs = $(selector);
  var length = imgs.length;

  imgs.on("click", function () {
    var current = $(this);
    var index = imgs.index(current) + 1; // next img index
    if (index === length) index = 0; // cycle back to 1st img
    imgs.each(function (i, el) {
      el = $(el); // wrap in jQuery element
      if (index === i) el.removeClass("hidden");
      else el.addClass("hidden");
    });
  });

}
