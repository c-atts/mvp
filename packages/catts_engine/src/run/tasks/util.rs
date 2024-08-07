use crate::{run, tasks::TaskError};

pub fn save_error_and_cancel(run_id: &[u8; 12], error: String) -> TaskError {
    let mut run = run::get(run_id).unwrap();
    run.error = Some(error.to_string());
    run::update(run).unwrap();
    TaskError::Cancel(error)
}