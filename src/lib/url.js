const user_name = process.env.USER_NAME;
const pass_word = process.env.PASS_WORD;

const urlstr = `mongodb+srv://${user_name}:${pass_word}@cluster0.jy4xd.mongodb.net/project_db?retryWrites=true&w=majority&appName=Cluster0`;
export default urlstr;