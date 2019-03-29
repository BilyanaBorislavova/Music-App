import {post, remove} from './crud';
import { get } from './crud';

export default class AuthenticationService {
    constructor() {
        this.baseUrl = 'http://localhost:8000'
        this.loginUrl = `${this.baseUrl}/auth/login`
        this.registerUrl = `${this.baseUrl}/auth/register`
        this.createArtistUrl = `${this.baseUrl}/create/createArtist`
        this.getAllArtistsUrl = `${this.baseUrl}/view/viewArtists`
        this.createSongUrl = `${this.baseUrl}/create/createSong`
        this.getUsersUrl = `${this.baseUrl}/view/getUsers`
        this.deleteUserUrl = `${this.baseUrl}/view/removeUser/`
        this.getProfileUrl = `${this.baseUrl}/auth/profile/`
        this.getArtistUrl = `${this.baseUrl}/view/viewArtist/`
        this.myPlaylistUrl = `${this.baseUrl}/view/myPlaylist/`
    }

    login(userBody) {
        return post(this.loginUrl, userBody)
    }

    register(userBody) {
        return post(this.registerUrl, userBody)
    }

    createArtist(artist) {
        return post(this.createArtistUrl, artist)
    }

    createSong(song) {
        return post(this.createSongUrl, song)
    }

    getAllArtists() {
        return get(this.getAllArtistsUrl)    
    }

    getAllUsers() {
        return get(this.getUsersUrl)
    }

    deleteUser(user) {
        return get(this.deleteUserUrl + user)
    }

    getProfile(user) {
        return get(this.getProfileUrl + user)
    }

    getArtist(artist) {
        return get(this.getArtistUrl + artist)
    }

    addToPlaylist(song, userId) {
        return get(this.getArtistUrl + song + '/' + userId)
    }

    myPlaylist(userId){
        return get(this.myPlaylistUrl + userId)
    }

    deleteSong(userId, name) {
        return get(this.myPlaylistUrl + userId + '/' + name)
    }
}