/* eslint-disable react/react-in-jsx-scope */
import '../styles/imageResult.css'

/* eslint-disable react/prop-types */
const ImageResult = ({ result }) => {
  return (
    <div className={'image-result'}>
      <img className="image-content" src={result.image} />
      <p className="image-url">{result.url}</p>
      <p className="image-title">{result.title}</p>
      <p className="image-description">{result.description}</p>
    </div>
  )
}

export default ImageResult
