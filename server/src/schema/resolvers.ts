import User from "../models/User.js"; // Assuming you import User and findById from the correct path
// import { BookDocument } from "../models/Book";
// import { IResolvers } from 'graphql-tools';
import { signToken} from "../services/auth.js"



// Check if user is authenticated
const ensureAuthenticated = (context: any) => {
  if (!context.user) {
    throw new Error('Not authenticated');
  }
};

const resolvers: any = {
  Query: {
    me: async (_: any, __: any, context:any) => {
      ensureAuthenticated(context);
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    addUser: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const user = new User({ username, email, password });
      await user.save();
      return { token: signToken(user.username,user.email,user._id), user };
    },
    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error('Invalid credentials');
      }
      return { token: signToken(user.username,user.email,user._id), user };
    },
    
    
    saveBook: async (_: any, { authors, description, title, bookId, image, link }: any, context: any) => {
      ensureAuthenticated(context);
      const user = await User.findById(context.user._id);
      const book: any =  { authors, description, title, bookId, image, link };
      user?.savedBooks.push(book);
      await user?.save();
      return user;
    },
    removeBook: async (_: any, { bookId }: { bookId: string }, context:any) => {
      ensureAuthenticated(context);
      

      const updateUser= await User. findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
   
      
      
      return updateUser;
    },
  },
};

export { resolvers };