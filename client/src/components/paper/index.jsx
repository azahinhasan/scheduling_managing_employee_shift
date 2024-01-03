import './paper.styles.scss'

/**
 * @component
 * @description Add custom paper under the children component.
 * @param {jsx} children - Children component needed.
 * @requires forgedPaper.styles.scss
 * @returns JSX.
 **/
 function CustomPaper(props) {

    return (
      <div>
        <h1 className='except-print'>{props.title}</h1>
        <div className="paper_for_table">
          {props.children}
        </div>
      </div>
    );
}
export default CustomPaper;