import _ from 'lodash'
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import Task from './Task'
import ProgressGraph from './ProgressGraph'
import InProgressList from './InProgressList'
import ToDoList from './ToDoList'

class Project extends Component {

  static propTypes = {
    addTask: PropTypes.func.isRequired,
    startTask: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tasks: PropTypes.shape({
      count: PropTypes.number.isRequired,
      todo: PropTypes.number.isRequired,
      inProgress: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
      }))
    })
  }

  constructor(props) {
    super(props);

    this.state = { task: '', description: '' }
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    if (event.target.id === 'task') {
      this.setState({ task: event.target.value });
    }  
    if (event.target.id === 'description') {
      this.setState({ description: event.target.value });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.addTask(this.props.id, this.state.task, this.state.description);
    this.setState({ task: '' });
    this.setState({ description: '' });
  }


  render() {
    return (
      <div>
        <ProgressGraph {...this.props} />
        <div>
          <form onSubmit={this.onFormSubmit}>
            Task Name
            <FormControl
              type='text'
              id='task'
              value={this.state.task}
              placeholder='Name of the new task'
              onChange={this.onInputChange}
            />
            Task Description
            <FormControl
              type='text'
              id='description'
              value={this.state.description}
              placeholder='Description for the new task'
              onChange={this.onInputChange}
            />
            <Button bsStyle='primary' type='submit'>Create</Button>
          </form>
        </div>
        <h4 className='in-progress'>In Progress</h4>
          <InProgressList {...this.props} />
        <h4 className='to-do'>To Do</h4>
          <ToDoList {...this.props} />
      </div>
    );
  }
}

function mapStateToProps({ projects }) {
  return { projects };
}

export default connect(mapStateToProps)(Project);
