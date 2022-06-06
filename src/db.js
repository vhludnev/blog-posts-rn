import * as SQLite from 'expo-sqlite'
import { nanoid } from '@reduxjs/toolkit'

const db = SQLite.openDatabase('post.db')

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          resolve, //  () => resolve(),
          (_, error) => reject(error)
        )
      })
    })
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM posts',
          [],
          (_, result) => resolve(result.rows._array),
          (_, error) => reject(error)
        )
      })
    })
  }

  static createPost({ text, date, booked, img }) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
          [text, date, 0, img],
          //(_, result) => resolve(result.insertId),
          () => resolve(nanoid()),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateBookedPost(post) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  static textUpdatePost(post) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET text = ? WHERE id = ?',
          [post.text, post.id],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  static removePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }
}