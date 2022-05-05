import timesheets from './timesheets.json'
import '../services/auth.service.js'

test('the timesheet data is correct', () => {
    expect(timesheets).toMatchSnapshot();
    });

    for (let i = 0; i < timesheets.length; i += 1){
        test(`timesheets[${i}] should have properties (employee_id, end_time, start_time, timesheet_id, work_desc)`, () => {
            expect(timesheets[i]).toHaveProperty('employee_id');
            expect(timesheets[i]).toHaveProperty('end_time');
            expect(timesheets[i]).toHaveProperty('start_time');
            expect(timesheets[i]).toHaveProperty('timesheet_id');
            expect(timesheets[i]).toHaveProperty('work_desc');
        });
};

test('spying (original implementation) an axios GET request for timesheet', () => {
    const timesheet = {
        employee_id: n => `Employee ID: ${n}`
    };
    const spy = jest.spyOn(timesheet, 'employee_id');
    expect(timesheet.employee_id(1)).toBe('Employee ID: 1');
    expect(spy).toHaveBeenCalledWith(1);
});
