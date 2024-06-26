use ic_cdk::update;

use crate::{error::Error, siwe::get_authenticated_eth_address, UserProfile, USER_PROFILES};

#[update]
async fn profile_save_current(name: String, avatar_url: String) -> Result<UserProfile, Error> {
    // Get the address of the caller from the siwe provider canister, return error if it fails. A failure
    // here means that the caller is not authenticated using the siwe provider. This might happen if the
    // caller uses an anonymous principal or has authenticated using a different identity provider.
    let address = get_authenticated_eth_address().await?;

    let profile = match USER_PROFILES.with(|p| p.borrow().get(&ic_cdk::caller().to_string())) {
        Some(profile) => profile.clone(),
        None => UserProfile::new(address.as_str().to_string(), name, avatar_url),
    };

    USER_PROFILES.with(|p| {
        let mut profiles = p.borrow_mut();
        profiles.insert(ic_cdk::caller().to_string(), profile.clone());
    });

    Ok(profile)
}
