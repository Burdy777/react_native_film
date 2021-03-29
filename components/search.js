import React from 'react'
import { View, TextInput, Button, FlatList,ActivityIndicator } from 'react-native';
import FilmItem from './filmItem';
import {getFilmsFromApiWithSearchedText} from './../api/TMDBApi'
import { connect } from 'react-redux'

class Search extends React.Component {

    constructor(props) {
        super(props);
        // INITIALISATION du state
         /*Dans le state, on ne gère que des données qui, une fois modifiées,
         peuvent affecter le rendu de notre component.*/
        this.state = {
            films : [],
            displayActivityIndicator: false
        };

        // utilisation de 'searchedText' en tant que propriete car elle n'a pas à affecté le rendu du component   
        this.searchedText = "";     
        this.page = 0 // Compteur pour connaître la page courante
        this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
      }

      // Recuperation des film sur l'API
    _loadFilms() {
    // Si le champs texte n'est pas vide
    if( this.searchedText.length > 0) {
    // loader a true
     this.setState({displayActivityIndicator: true}) 

     return getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then((data) => {
         // on met a jour les pages et total page
         this.page = data.page;
         this.totalPages = data.totalPages;

        this.setState({ 
            films : [...this.state.films, ...data.results],
            displayActivityIndicator: false
        }) 
     })
    }
  }

   _displayActivityIndicator() {
       if(this.state.displayActivityIndicator === true) {
            return (
            <ActivityIndicator size='large' style={style.activityIndicator}/>
        )
       }
  }

  _searchFilm() {
    this.page = 0;
    this.totalPages = 0;
    this.setState({
        films: [],
    }, () => {
        console.log('total page: ',this.totalPages, 'this.page: ', this.page, 'nombre de film: ',this.state.films.length);
        this._loadFilms();
    })
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

    render() {
        return (
            <View style={style.container}>

                <TextInput
                 placeholder='Entrer un film'
                  style={style.input}
                  onChangeText={(text) => this.searchedText = text}
                  onSubmitEditing={() => this._searchFilm()}
                  />

                <Button 
                    title='Je veux ce film !'
                    style={style.button}
                    onPress = { ()=>{ this._searchFilm() } }
                />

            {/* composant FlatList avec item courant (prend une view) , une clef, et les données */}
            <FlatList
            renderItem={ ({item}) => <FilmItem 
            // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
            film={item} displayDetailForFilm={this._displayDetailForFilm}/>  }
            keyExtractor={(item) => item.id.toString()}
            data={ this.state.films }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if(this.page < this.totalPages) {
                this._loadFilms()
                }
            }}
            />

            { this._displayActivityIndicator() }
            
            </View>
        )
    }
}

const style = {
    container :{
        marginTop:75,
        justifyContent:'space-around',
    },
    button: {
        height:50,
        width:50,
    },
    input: {
    },
    activityIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
}
// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(Search)