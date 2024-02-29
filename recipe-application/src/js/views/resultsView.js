import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'we could not find a recipe. please try again';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1); 
    console.log(result.id === id)
    return `<li class="preview">
                    <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" 
                    href="#${result.id}">
                      <figure class="preview__fig">
                        <img src=${result.image} alt=${result.title} />
                      </figure>
                      <div class="preview__data">
                        <h4 class="preview__name">
                          ${result.title}
                        </h4>
                        <p class="preview__publisher">${result.publisher}</p>
                      </div>
                    </a>
                  </li>`;
  }
}

export default new ResultsView();
