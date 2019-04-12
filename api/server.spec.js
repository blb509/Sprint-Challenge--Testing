const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("POST /games", () => {
    let game = {
      title: "test1",
      genre: "tester1",
      releaseYear: 1
    };
    let gameNoTitle = {
      genre: "tester2",
      releaseYear: 2
    };
    let gameNoGenre = {
      title: "test3",
      releaseYear: 3
    };
    let gameNoYear = {
      title: "test4",
      genre: "tester4"
    };

    it("responds with 200", async () => {
      const response = await request(server)
        .post("/games")
        .send(game);
      expect(response.status).toBe(200);
    });

    it("responds with 422 because of no title", async () => {
      const response = await request(server)
        .post("/games")
        .send(gameNoTitle);
      expect(response.status).toBe(422);
    });

    it("responds with 422 because of no genre", async () => {
      const response = await request(server)
        .post("/games")
        .send(gameNoGenre);
      expect(response.status).toBe(422);
    });

    it("responds with 200 even though no Year", async () => {
      const response = await request(server)
        .post("/games")
        .send(gameNoYear);
      expect(response.status).toBe(200);
    });
  });

  describe("GET /games", () => {
    it("should respond with 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });

    it("should return an array", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
