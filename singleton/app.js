class TokenService {
  constructor() {
    if (TokenService.instance) {
      return TokenService.instance;
    }
    this.isRefreshing = false;
    this.subscribers = [];
    TokenService.instance = this;
  }

  async refreshToken() {
    console.log("subscribers-> ", this.subscribers);
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.subscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      ); // Suppose this is a request to the server
      const newToken = await response.json();

      this.isRefreshing = false;
      this.subscribers.forEach((callback) => callback(newToken));
      this.subscribers = [];

      return newToken;
    } catch (error) {
      this.isRefreshing = false;
      this.subscribers = [];
      throw error;
    }
  }
}

// Using TokenService in different services
const tokenService = new TokenService();

const callService1 = async () => {
  try {
    const response = { status: 401 };
    if (response.status === 401) {
      const newToken = await tokenService.refreshToken();
      console.log("newToken=> ", newToken);
      // Request again with a new token
    }
  } catch (error) {
    console.error(error);
  }
};

const callService2 = async () => {
  try {
    const response = { status: 401 };
    if (response.status === 401) {
      const newToken = await tokenService.refreshToken();
      // Request again with a new token
    }
  } catch (error) {
    console.error(error);
  }
};

const callService3 = async () => {
  try {
    const response = { status: 401 };
    if (response.status === 401) {
      const newToken = await tokenService.refreshToken();
      // Request again with a new token
    }
  } catch (error) {
    console.error(error);
  }
};

const callService4 = async () => {
  try {
    const response = { status: 401 };
    if (response.status === 401) {
      const newToken = await tokenService.refreshToken();
      // Request again with a new token
    }
  } catch (error) {
    console.error(error);
  }
};

callService1();
callService2();
callService3();
callService4();
