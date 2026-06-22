/**
 * Data Manager - Manages portal content using localStorage
 * Provides centralized data management for employee.html and editor.html
 */

const DataManager = {
    // Storage keys
    STORAGE_KEY_ANNOUNCEMENTS: 'portal_announcements',
    STORAGE_KEY_CIRCULARS: 'portal_circulars',
    STORAGE_KEY_EVENTS: 'portal_events',

    // Default data
    defaultAnnouncements: [],

    defaultCirculars: [],

    defaultEvents: [],

    // Initialize data if not already present
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY_ANNOUNCEMENTS)) {
            localStorage.setItem(this.STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(this.defaultAnnouncements));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_CIRCULARS)) {
            localStorage.setItem(this.STORAGE_KEY_CIRCULARS, JSON.stringify(this.defaultCirculars));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_EVENTS)) {
            localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(this.defaultEvents));
        }
    },

    // Announcements methods
    getAnnouncements: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY_ANNOUNCEMENTS)) || this.defaultAnnouncements;
        } catch (e) {
            return this.defaultAnnouncements;
        }
    },

    setAnnouncements: function(announcements) {
        localStorage.setItem(this.STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(announcements));
    },

    addAnnouncement: function(announcement) {
        const announcements = this.getAnnouncements();
        announcements.push(announcement);
        this.setAnnouncements(announcements);
    },

    updateAnnouncement: function(index, announcement) {
        const announcements = this.getAnnouncements();
        if (index >= 0 && index < announcements.length) {
            announcements[index] = announcement;
            this.setAnnouncements(announcements);
        }
    },

    deleteAnnouncement: function(index) {
        const announcements = this.getAnnouncements();
        if (index >= 0 && index < announcements.length) {
            announcements.splice(index, 1);
            this.setAnnouncements(announcements);
        }
    },

    // Circulars methods
    getCirculars: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY_CIRCULARS)) || this.defaultCirculars;
        } catch (e) {
            return this.defaultCirculars;
        }
    },

    setCirculars: function(circulars) {
        localStorage.setItem(this.STORAGE_KEY_CIRCULARS, JSON.stringify(circulars));
    },

    addCircular: function(circular) {
        const circulars = this.getCirculars();
        circulars.push(circular);
        this.setCirculars(circulars);
    },

    updateCircular: function(index, circular) {
        const circulars = this.getCirculars();
        if (index >= 0 && index < circulars.length) {
            circulars[index] = circular;
            this.setCirculars(circulars);
        }
    },

    deleteCircular: function(index) {
        const circulars = this.getCirculars();
        if (index >= 0 && index < circulars.length) {
            circulars.splice(index, 1);
            this.setCirculars(circulars);
        }
    },

    // Events methods
    getEvents: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY_EVENTS)) || this.defaultEvents;
        } catch (e) {
            return this.defaultEvents;
        }
    },

    setEvents: function(events) {
        localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    },

    addEvent: function(event) {
        const events = this.getEvents();
        events.push(event);
        this.setEvents(events);
    },

    updateEvent: function(index, event) {
        const events = this.getEvents();
        if (index >= 0 && index < events.length) {
            events[index] = event;
            this.setEvents(events);
        }
    },

    deleteEvent: function(index) {
        const events = this.getEvents();
        if (index >= 0 && index < events.length) {
            events.splice(index, 1);
            this.setEvents(events);
        }
    },

    // Reset all data to defaults
    resetAll: function() {
        localStorage.removeItem(this.STORAGE_KEY_ANNOUNCEMENTS);
        localStorage.removeItem(this.STORAGE_KEY_CIRCULARS);
        localStorage.removeItem(this.STORAGE_KEY_EVENTS);
        this.init();
    }
};

// Initialize on load
DataManager.init();
