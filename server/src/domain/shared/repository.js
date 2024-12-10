class Repository {
    constructor(model) {
      this.model = model;
    }
  
    async findById(id) {
      try {
        return await this.model.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async findAll() {
      try {
        return await this.model.find();
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async findOne(query) {
      try {
        return await this.model.findOne(query);
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async create(data) {
      try {
        return await this.model.create(data);
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async update(id, data) {
      try {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async delete(id) {
      try {
        return await this.model.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
  
  module.exports = Repository;
  