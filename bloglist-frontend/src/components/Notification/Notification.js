import PropTypes from 'prop-types'

export const Notification = ({ message, msgStyle }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${msgStyle}`}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  msgStyle: PropTypes.string.isRequired
}