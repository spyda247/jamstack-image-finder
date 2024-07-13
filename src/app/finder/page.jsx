'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './finder.module.css'

export default function Finder() {
  0
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  // Function to handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (query.trim() === '') return
    try {
      // Send GET request to unsplash API with query
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=_zkfxBMTYM8l9YbN8ki0XUAp997tiCc4KjNWRTMmPN4`
      )
      const data = await response.json()

      // Update results with data
      setResults(data.results)
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  /* JSX to return the finder component */

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Photo Finder</h1>

      <form id="search-id" onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="query"
          id="search-query"
          placeholder="Search for photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      <div id="results" className={styles.results}>
        {results.map((photo) => (
          <Image
            width="300"
            height="250"
            key={photo.id}
            src={photo.urls.regular}
            alt={photo.alt}
          />
        ))}
      </div>
    </div>
  )
}
