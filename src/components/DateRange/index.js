import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import { Container, InputField } from './StyledComponents';

const moment = extendMoment(originalMoment);

class DateRange extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: false,
      value: moment.range(today.clone().subtract(7, "days"), today.clone())
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderSelectionValue = () => {
    return (
      <div>
        {"From "}
        {this.state.value.start.format("YYYY-MM-DD")}
        {" - "}
        {"To "}
        {this.state.value.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  render() {
    return (
      <div>
      <InputField
          type="button"
          onClick={this.onToggle}
      >
      {this.renderSelectionValue()}
      </InputField>

      {this.state.isOpen && (
          <Container>
            <DateRangePicker
              value={this.state.value}
              onSelect={this.onSelect}
              singleDateRange={true}
              />
          </Container>
      )}
      </div>
    );
  }
}

export default DateRange;