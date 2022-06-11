## BLOG Posts mobile app

- React Native (v.0.68),
- Expo (sdk v.45),
- DB: SQL (expo-sqlite),
- Context: Redux and @reduxjs/toolkit,
- Adaptive styles (for portrait and landscape views),
- Android and IOS friendly,
- Options for posts: add, edit, remove, mark as Favourite

<br/>

## _Previews_

| Main screen | Post screen | Zoom in image |
| ------ | ------ | ------ |
| <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654943161157.jpg" width="200" alt="main screen" /> | <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654522955863.jpg" width="200" alt="post screen" /> | <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654522955860.jpg" width="200" alt="zoom-in screen" /> |

<br/><br/>

| Create post | Favourites tab | Side menu |
| ------ | ------ | ------ |
| <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654942818479.jpg" width="200" alt="main screen" /> | <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654522955873.jpg" width="200" alt="post screen" /> | <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654522955870.jpg" width="200" alt="zoom-in screen" /> |

<br/><br/>

| Search result | Create post input |
| ------ | ------ |
| <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654971508945.jpg" width="200" alt="main screen" /> | <img src="https://github.com/vhludnev/blog-posts-rn/blob/main/assets/previews/1654942818479.jpg" width="200" alt="post screen" /> |

<br/><br/>

## Installation & deploy

The app requires [Node.js](https://nodejs.org/) v16+ and expo sli to run.

Install the dependencies and devDependencies first. _Example:_

```sh
npm i
npm i -g expo-cli
expo init `App project name`
expo login
expo publish
expo build:android -t apk `or` expo build:android -t app-bundle (*)
expo fetch:android:keystore (*)
expo upload:android (*)
expo build:ios (**)
expo upload:ios (**)

```

(*) - _for android_
<br/>
(**) - _for ios_