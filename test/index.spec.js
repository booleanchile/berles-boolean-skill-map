import { getByLabelText, fireEvent } from '@testing-library/dom';

import { createSpiderChart } from '@app/index';

describe('Index Skills Map', () => {
  const formData = {
    'Internet': [1, 1, 1, 2, 3],
    'Backend': [1, 1, 0, 0, 0],
    'Programación': [1, 1, 3, 0, 0],
    'Control Versiones': [1, 1, 2, 3, 0],
    'HTML y A11y': [1, 1, 1, 2, 3],
    'CSS': [1, 1, 1, 2, 3],
    'Javascript': [1, 1, 3, 0, 0],
    'Testing': [1, 1, 3, 0, 0],
    'Performance': [1, 1, 0, 0, 0],
    'Devops': [1, 1, 1, 0, 0],
    'Arquitectura': [1, 3, 0, 0, 0]
  };
  let chartContainerElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <svg height="800" width="800">
        <g height={800} width={800} transform="translate(400,400)"></g>
      </svg>
    `;
    chartContainerElement = document.querySelector('svg g');
  });

  it('should render skill maps on target element', () => {
    const skillsMapElement = createSpiderChart(
      chartContainerElement,
      formData,
    );
    expect(skillsMapElement).toMatchSnapshot();
  });

  it(`should execute provided callback in onClickSegment property with
    form data when click a segment`, () => {
    const onClickSegmentSpy = jest.fn();
    const skillsMapElement = createSpiderChart(
      chartContainerElement,
      formData,
      { onClickSegment: onClickSegmentSpy }
    );
    const targetIndex = 0;
    const targetSegmentLabel = Object.keys(formData)[targetIndex];
    
    fireEvent.click(
      getByLabelText(skillsMapElement, targetSegmentLabel)
    );

    expect(onClickSegmentSpy).toHaveBeenCalledWith(
      targetSegmentLabel,
      formData[targetSegmentLabel]
    );
  });
});
