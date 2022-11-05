import './styles.css';

import { Component } from 'react';

import { carregarPosts } from '../../utils/load-posts'

import { Posts } from '../../components/Posts/index';
import { Button } from '../../components/Button/index';
import { SearchInput } from '../../components/Input/index';

class App extends Component {
  state = {
    posts: [],
    allPosts: [],
    currentPage: 0,
    postsPerClick: 5,
    searchInputValue: ''
  }

  //Como o conteúdo desse método é uma promise uso async
  async componentDidMount() {
    await this.carregarPosts()
  }

  carregarPosts = async () => {
    //carregarPosts está salva em './utils/load-posts'
    const imgsAndPosts = await carregarPosts()

    const { currentPage, postsPerClick } = this.state

    this.setState({
      posts: imgsAndPosts.slice(currentPage, postsPerClick),
      allPosts: imgsAndPosts,
    })
  }

  loadMorePosts = () => {
    const {
      currentPage, allPosts, posts, postsPerClick
    } = this.state

    //Lê os index das próximas páginas
    const nextPage = currentPage + postsPerClick
    //Trás as páginas dos index lido
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerClick)

    posts.push(...nextPosts)
    this.setState({ posts, currentPage: nextPage })
  }

  //Pega cada alteração do .value do input apresentado no HTML
  handleInputChange = (e) => {
    const { value } = e.target
    this.setState({ searchInputValue: value })
  }

  render() {
    const {
      posts, currentPage, postsPerClick, allPosts, searchInputValue
    } = this.state
    const buttonDisabled = currentPage + postsPerClick >= allPosts.length

    // Operação ternária para saber o valor de posts filtrados
    const filteredPosts = !!searchInputValue ?
      posts.filter(post => {//Filtro em 'title' e 'body'
        return (post.title.toLowerCase().includes(searchInputValue.toLowerCase())
        || post.body.toLowerCase().includes(searchInputValue.toLowerCase()))
      })
      : posts

    return (
      <section className='container'>
        <div className='component'>
          {/* Avaliação de curto circuito:
          Se existe valor no input, ele mostra a mensagem */}
          {!!searchInputValue && (
            <h2>SEARCH VALUE: {searchInputValue}</h2>
          )}

          <SearchInput
            handleInputChange={this.handleInputChange}
            searchInputValue={searchInputValue}
          />

          {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
          {filteredPosts.length === 0 && (<h1> Sem resultados</h1>)}

          {/* Se não existe valor no input, ele mostra o botao */}
          {!searchInputValue && (
            <Button
              buttonDisabled={buttonDisabled}
              onClick={this.loadMorePosts}
            />
          )}

        </div>
      </section>
    );

  }
}

export default App;
