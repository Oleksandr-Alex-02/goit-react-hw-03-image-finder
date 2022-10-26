import React, { Component } from 'react'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import css from './ImageGallery.module.css'

class ImageGallery extends Component {
    state = {
        photo: null,
        error: null,
        loader: false,
        page: 1,
    }

    async componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageSearch
        const nextName = this.props.imageSearch
        const key = 'key=29453019-5a69b6c7b2f01a070c80deb0c'
        const page = 'this.state.page'

        if (prevName !== nextName) {
            this.setState({ loader: true })

            await fetch(`https://pixabay.com/api/?q=${nextName}&${page}&${key}&image_type=photo&orientation=horizontal&per_page=4`)
                .then(res => res.json())
                .then(photo => this.setState({ photo }))
                .catch(error => this.setState({ error }))
                .finally(this.setState({ loader: false }));
        }
    }

    render() {
        const { loader, photo, error } = this.state
        const { nextName } = this.props.imageSearch

        return (
            <ul className={css.imageGallery}>
                {error && <h1>немає такого {nextName}</h1>}
                {loader && (<div>Загрузка....</div>)}
                {photo && (<ImageGalleryItem photo={photo} />)}

            </ul>
        )
    }
}

export default ImageGallery;


