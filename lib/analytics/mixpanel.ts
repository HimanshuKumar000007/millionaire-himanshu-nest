/**
 * Mixpanel analytics helper for SciPrep (NEST Preparation).
 * Autocapture & session recording are active by default via the snippet in app/layout.tsx.
 * Use these helper functions for custom event tracking if needed.
 */

declare global {
  interface Window {
    mixpanel?: any;
  }
}

/**
 * Track custom events in Mixpanel
 * @param eventName Name of the action or event
 * @param properties Optional metadata object to attach to the event
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.mixpanel && typeof window.mixpanel.track === 'function') {
    try {
      window.mixpanel.track(eventName, properties);
    } catch (err) {
      console.warn('[Mixpanel] Failed to track event:', eventName, err);
    }
  }
};

/**
 * Identify a user in Mixpanel upon login or registration
 * @param userId Unique student or user ID
 * @param traits Additional user profile properties (e.g. email, name, plan)
 */
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.mixpanel && typeof window.mixpanel.identify === 'function') {
    try {
      window.mixpanel.identify(userId);
      if (traits && window.mixpanel.people && typeof window.mixpanel.people.set === 'function') {
        window.mixpanel.people.set(traits);
      }
    } catch (err) {
      console.warn('[Mixpanel] Failed to identify user:', err);
    }
  }
};

/**
 * Reset user identity upon logout
 */
export const resetUser = () => {
  if (typeof window !== 'undefined' && window.mixpanel && typeof window.mixpanel.reset === 'function') {
    try {
      window.mixpanel.reset();
    } catch (err) {
      console.warn('[Mixpanel] Failed to reset user:', err);
    }
  }
};
