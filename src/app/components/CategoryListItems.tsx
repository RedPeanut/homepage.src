import React from "react"
import { connect } from "react-redux"
import { setCategory, setModule } from "../reducers"

class CategoryListItems extends React.Component {

  constructor(props) {
    super(props);
  }

  //componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidUpdate(prevProps, prevState) {}

  handleClick = (category, module) => {
    this.props.onSetCategory(category);
    this.props.onSetModule(module);
  };

  render() {

    const _category = this.props.category || "color";
    const _module = this.props.module || "converter";

    return (
      <ul>
        {
          this.props.items.map(({label, module}, i) => (
            <li key={label}
              className={this.props.categoryProp === _category && module === _module ? "active" : ""}
            >
              {/* <a href={`?category=${this.props.category}&module=${module}`}>{label}</a> */}
              <a onClick={this.handleClick.bind(null, this.props.categoryProp, module)}>{label}</a>
            </li>
            ))
        }
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchVal: state.tools.searchVal,
    category: state.tools.category,
    module: state.tools.module,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCategory: (v) => dispatch(setCategory(v)),
    onSetModule: (v) => dispatch(setModule(v)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListItems);
