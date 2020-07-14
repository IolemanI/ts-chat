import axios from 'axios';

export default class API {
  private client: any;
  private baseURL: string;
  public entity: any;

  constructor(options: any) {
    this.client = options.client ||
      axios.create({
        baseURL: options.baseUrl,
      });
    this.baseURL = options.baseURL;

    this.client.interceptors.request.use(
      (req: any) => req,
      (error: any) => error,
    );

    this.client.interceptors.response.use(
      (res: any) => res,
      async (error: any) =>
        error.response ? error.response.data : error,
    );

    this.entity = {
      get: ({ url = '', ...rest }) => this.client.get(url, rest),

      post: ({ url = '', ...rest }) =>
        this.client.post(url, rest.data || rest, rest.config || {}),

      put: ({ url = '', ...rest }) => this.client.put(url, rest),

      patch: ({ url = '', ...rest }) =>
        this.client.patch(url, rest.data || rest, rest.config || {}),

      delete: ({ url = '', ...rest }) => this.client.delete(url, rest),
    };
  }
}
