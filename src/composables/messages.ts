class Messages {

    static ERROR_SAVING_PROFILE() {
        return {
            code: 422,
            error: true,
            message: 'Error while saving user profile'
          }
    }
}
export default Messages;