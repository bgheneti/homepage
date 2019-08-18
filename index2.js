import React, { Component } from "react"
import SimpleLayout from "../components/simple-layout"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import Newsletter from "../components/Newsletter"
import PageHeader from "../components/page-header"
import Title from "../components/page-title"
import debounce from "debounce-fn"
import "./photography.css"

export default class Photography extends Component {
  constructor(props) {
    super(props)
    this.onResize = debounce(this.onResize.bind(this), 500)
  }

  componentWillMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.onResize)
    }

    this.setState({
      selected: null,
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns()
    })
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize)
    }
  }

  createColumns() {
    const photos = this.props.data.allPhotosJson.edges
    const count = this.findColumnCount()
    const thumbnailSize = this.findThumbnailSize()
    const columns = []

    let c = count
    while (c--) {
      columns.push({ height: 0, photos: [] })
    }

    const len = photos.length
    let i = -1
    while (++i < len) {
      let column = columns[0]

      // Add next photo to the column with lowest height
      let c = 0
      while (++c < count) {
        if (columns[c].height < column.height) column = columns[c]
      }

      let p = photos[i].node
      column.photos.push(p)
      column.height += p.sizes[thumbnailSize].height
    }

    return columns
  }

  findColumnCount() {
    if (typeof window === "undefined") return 3

    const width = window.innerWidth

    if (width < 900) return 2
    return 3
  }

  findThumbnailSize() {

    return "medium"

    if (typeof window === "undefined") return "small"

    const width = window.innerWidth


    if (width < 500) return "small"
    return "medium"
  }

  onResize() {
    this.setState({
      selected: null,
      thumbnailSize: this.findThumbnailSize(),
      columns: this.createColumns()
    })
  }

  render() {
    const title = `Bio - ${this.props.data.site.siteMetadata.title}`

    return (
      <SimpleLayout
        name="Banti Gheneti - Bio"
        location={this.props.location}
        title={title}
        type="photos"
        desc="robotics, social entrepreneurship, computer science"
        url="https://gheneti.com"
        image="https://cldup.com/go95bqT7sK.jpg"
      >
        <PageHeader image="http://web.mit.edu/bgheneti/www/profile.jpg">


          Played a couple of hours a day playing with autonomous boats at the <a href="http://senseable.mit.edu/roboat/">Senseable City Lab</a>.
          Finished my <a href="https://dspace.mit.edu/handle/1721.1/121672">Master's thesis on making shapes out of robots</a> and planning my life afterwards.
          Learning new tricks by going to classes in <a href="http://underactuated.mit.edu">control systems</a> and machine learning.
          Sporadically attends <a href="https://www.youtube.com/watch?v=7ROelYvo8f0&amp;feature=youtu.be">neuroscience</a> and global development talks around <a href="http://calendar.mit.edu/">MIT</a>.
          Enjoys tea (green, black, chamomile), <a href="http://vo2vegancafe.com/">vegan food</a>, community radio (<a href="http://wmbr.org/">WMBR</a>, <a href="http://dublab.com/">dublab</a>), and sleep.
        </PageHeader>
        <div className="photos">{this.renderGrid()}</div>
        {/*<Newsletter />*/}
      </SimpleLayout>
    )
  }

  renderGrid() {
    const photos = this.props.data.allPhotosJson.edges
    const columns = [[], []]

    const len = photos.length
    let i = -1

    while (++i < len) {
      columns[i % columns.length].push(photos[i].node)
    }

    return (
      <div className="grid">
        {columns.map(c => this.renderColumn(c))}
        <div className="x-clear" />
      </div>
    )
  }

  renderColumn(column) {
    return (
      <div className="column">{column.map(p => this.renderThumbnail(p))}</div>
    )
  }

  renderThumbnail(p) {
    return (
      <div className="thumbnail x-sans">
        <Link className="caption center" to={p.path}>
          <h1>{p.title}</h1>
        </Link>
        <Link to={p.path}>
          <img src={p.sizes[this.state.thumbnailSize].url} />
        </Link>
      </div>
    )
  }
}

export const query = graphql`
  query PhotographyQuery {
    site {
      siteMetadata {
        title
      }
    }

    allPhotosJson {
      edges {
        node {
          path
          title
          sizes {
            medium {
              url
              height
            }
          }
        }
      }
    }
  }
`
