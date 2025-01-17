import { faker } from '@faker-js/faker'

const getImage = () => faker.image.url(644, 362, 'animals', true)
const getType = () => faker.animal.type()
const getUrl = () => faker.internet.url()
const getText = () => faker.lorem.sentences()
const getTitle = (type) => faker.animal?.[type]?.() || type

const getData = () => {
  return new Promise((resolve, reject) => {
    try {
      const data = [...new Array(100)].map((item, index) => {
        const type = getType()
        return {
          type,
          id: index + 1,
          url: getUrl(),
          title: getTitle(type),
          description: getText(),
          image: getImage(),
        }
      })
      resolve(data)
    } catch (e) {
      console.error('Error getting data', e)
      reject([])
    }
  })
}

export default getData
