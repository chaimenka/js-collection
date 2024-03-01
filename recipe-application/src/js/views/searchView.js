class SearchView{
    #parentEl = document.querySelector('.search'); 

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();

        if(query !== '') console.log(`*** found query '${query}'`); 
        return query; 
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault(); 
            handler(); 
        }); 
    }

    #clearInput() {
        this.#parentEl.querySelector('.search__field').value = '';  

    }
}

export default new SearchView();