import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 of many
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // other pages
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev', curPage) +
        this._generateMarkupButton('next', curPage)
      );
    }

    // page 1 of 1
    if (curPage === numPages && numPages === 1) {
      return '';
    }
  }

  _generateMarkupButton(btnClass, page) {
    return btnClass === 'prev'?
      `
            <button data-goto=${
              page - 1
            } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${page - 1}</span>
            </button>
        `:
        `<button data-goto=${page + 1} class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
  }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline'); 

            if (!btn) return; 

            const goToPage = +btn.dataset.goto; 

            handler(goToPage);
      })
  }
}

export default new PaginationView();
