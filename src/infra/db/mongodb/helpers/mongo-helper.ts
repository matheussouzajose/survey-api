import { MongoClient, type Collection } from 'mongodb'

let unknown
// @ts-ignore
// @ts-ignore
// @ts-ignore
export const MongoHelper = {
  client: unknown as MongoClient,
  uri: unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    this.client = await MongoClient.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
