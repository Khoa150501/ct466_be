const { ObjectId } = require("mongodb");

class BookService {
  constructor(client) {
    this.Book = client.db().collection("sach");
  }

  // Lấy dữ liệu từ payload
  extractBookData(payload) {
    const book = {
      masach: payload.masach,
      tensach: payload.tensach,
      dongia: payload.dongia,
      soquyen: payload.soquyen,
      namxb: payload.namxb,
      maxb: payload.maxb,
      tacgia: payload.tacgia,
    };
    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );
    return book;
  }

 async search(query) {
    const regex = new RegExp(query, "i");  // Sử dụng biểu thức chính quy không phân biệt hoa/thường
    return await this.Book.find({
      $or: [
        { masach: { $regex: regex } },
        { tensach: { $regex: regex } },
        { tacgia: { $regex: regex } },
        { namxb: { $regex: regex } },
        { maxb: { $regex: regex } },
      ]
    }).toArray();
  }

  // Hàm lấy tất cả sách
  async getAllBooks() {
    const cursor = await this.Book.find();
    return await cursor.toArray();
  }
}

module.exports = BookService;
