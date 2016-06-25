import _ from 'lodash'
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class ToDoList extends Component {

  constructor(props) {
    super(props);

    this.renderToDo = this.renderToDo.bind(this);
  }

  renderToDo(data) {
    console.log(data)
    return (
      <ListGroupItem key={data.id}>
        <h3> {data.name} </h3>
        <h4> {data.description} </h4>
        <Button bsStyle='primary'>Start Task</Button>
      </ListGroupItem>
    )
  }

  render() {
    return (
      <ListGroup>
        {this.props.tasks.list.map(this.renderToDo)}
      </ListGroup>
    );
  }
}

function mapStateToProps({ projects }) {
  return { projects };
}

export default connect(mapStateToProps)(ToDoList);
