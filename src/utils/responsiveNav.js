function myFunction() {
    const inputSearch = document.querySelector('.search__container');
    const reference = document.querySelector('a');
    const secondReference = document.querySelector('#secondReference')

    var nav = document.getElementById("top-nav");
    if (nav.className === "nav-main") {
      nav.className += " responsive";
      reference.insertAdjacentElement('afterend', inputSearch);
    } else {
      nav.className = "nav-main";
      secondReference.insertAdjacentElement('afterend', inputSearch)
    }
}