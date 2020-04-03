function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default {
  root: ({
    inactive
  }) => _extends({
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    transition: '0.3s'
  }, !inactive && {
    '&:hover': {
      transform: 'translateY(2px)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
    }
  })
};