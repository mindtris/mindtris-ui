"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
__name(cn, "cn");

// lib/animation-utils.ts
function getTransitionClass(property = "all", duration = "normal", easing = "ease-out") {
  const durationMap = {
    fast: "var(--duration-fast)",
    base: "var(--duration-base)",
    normal: "var(--duration-normal)",
    slow: "var(--duration-slow)",
    slower: "var(--duration-slower)"
  };
  const easingMap = {
    linear: "var(--ease-linear)",
    "ease-in": "var(--ease-in)",
    "ease-out": "var(--ease-out)",
    "ease-in-out": "var(--ease-in-out)",
    "ease-bounce": "var(--ease-bounce)"
  };
  const durationValue = durationMap[duration] || durationMap.normal;
  const easingValue = easingMap[easing] || easingMap["ease-out"];
  if (property === "colors") {
    return "var(--transition-colors)";
  }
  if (property === "opacity") {
    return "var(--transition-opacity)";
  }
  if (property === "transform") {
    return "var(--transition-transform)";
  }
  if (property === "all") {
    return "var(--transition-all)";
  }
  return `${property} ${durationValue} ${easingValue}`;
}
__name(getTransitionClass, "getTransitionClass");
function shouldReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
__name(shouldReduceMotion, "shouldReduceMotion");
function getRespectfulDuration(duration, respectPreference = true) {
  if (respectPreference && shouldReduceMotion()) {
    return 0;
  }
  return duration;
}
__name(getRespectfulDuration, "getRespectfulDuration");
function createKeyframe(animationName) {
  const animationMap = {
    fadeIn: "var(--animate-fade-in)",
    fadeOut: "var(--animate-fade-out)",
    slideUp: "var(--animate-slide-up)",
    slideDown: "var(--animate-slide-down)",
    spin: "var(--animate-spin)",
    pulse: "var(--animate-pulse)",
    bounce: "var(--animate-bounce)"
  };
  return animationMap[animationName] || animationMap.fadeIn;
}
__name(createKeyframe, "createKeyframe");

// lib/focus-utils.ts
function getFocusableElements(container = document) {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(", ");
  return Array.from(container.querySelectorAll(selector)).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden" && !el.hasAttribute("inert") && !el.hasAttribute("aria-hidden");
  });
}
__name(getFocusableElements, "getFocusableElements");
function focusFirstElement(container = document) {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return null;
  const firstElement = focusableElements[0];
  firstElement.focus();
  return firstElement;
}
__name(focusFirstElement, "focusFirstElement");
function focusLastElement(container = document) {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return null;
  const lastElement = focusableElements[focusableElements.length - 1];
  lastElement.focus();
  return lastElement;
}
__name(focusLastElement, "focusLastElement");
function focusNextElement(currentElement, container = document) {
  const focusableElements = getFocusableElements(container);
  const currentIndex = focusableElements.indexOf(currentElement);
  if (currentIndex === -1 || currentIndex === focusableElements.length - 1) {
    return focusFirstElement(container);
  }
  const nextElement = focusableElements[currentIndex + 1];
  nextElement.focus();
  return nextElement;
}
__name(focusNextElement, "focusNextElement");
function focusPreviousElement(currentElement, container = document) {
  const focusableElements = getFocusableElements(container);
  const currentIndex = focusableElements.indexOf(currentElement);
  if (currentIndex === -1 || currentIndex === 0) {
    return focusLastElement(container);
  }
  const previousElement = focusableElements[currentIndex - 1];
  previousElement.focus();
  return previousElement;
}
__name(focusPreviousElement, "focusPreviousElement");
function isFocusable(element) {
  const focusableElements = getFocusableElements(element.ownerDocument);
  return focusableElements.includes(element);
}
__name(isFocusable, "isFocusable");

// lib/variant-utils.ts
function createVariants(config) {
  return (props = {}) => {
    const { base, variants, defaultVariants = {}, compoundVariants = [] } = config;
    const mergedProps = { ...defaultVariants, ...props };
    const classes = [];
    if (base) {
      classes.push(base);
    }
    Object.entries(variants).forEach(([variantKey, variantMap]) => {
      const value = mergedProps[variantKey];
      if (value && variantMap[value]) {
        classes.push(variantMap[value]);
      }
    });
    compoundVariants.forEach((compound) => {
      const matches = Object.entries(compound.variants).every(
        ([key, value]) => mergedProps[key] === value
      );
      if (matches) {
        classes.push(compound.class);
      }
    });
    return cn(classes);
  };
}
__name(createVariants, "createVariants");
function variantClassNames(base, variants, props) {
  const classes = [base];
  Object.entries(variants).forEach(([variantKey, variantMap]) => {
    const value = props[variantKey];
    if (value && variantMap[value]) {
      classes.push(variantMap[value]);
    }
  });
  return cn(classes);
}
__name(variantClassNames, "variantClassNames");

// lib/a11y-utils.ts
var idCounter = 0;
function generateId(prefix = "id") {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
__name(generateId, "generateId");
function getAriaLabel(options) {
  if (options.label) return options.label;
  if (options["aria-label"]) return options["aria-label"];
  if (options["aria-labelledby"] && options.element) {
    const labelledByElement = options.element.ownerDocument.getElementById(
      options["aria-labelledby"]
    );
    return labelledByElement?.textContent || void 0;
  }
  return void 0;
}
__name(getAriaLabel, "getAriaLabel");
function getAriaDescribedBy(options) {
  const { helperTextId, errorId, hasError } = options;
  if (hasError && errorId) return errorId;
  if (helperTextId) return helperTextId;
  return void 0;
}
__name(getAriaDescribedBy, "getAriaDescribedBy");
function announceToScreenReader(message2, priority = "polite") {
  if (typeof window === "undefined") return;
  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("role", "status");
  liveRegion.setAttribute("aria-live", priority);
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "sr-only";
  liveRegion.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `;
  document.body.appendChild(liveRegion);
  setTimeout(() => {
    liveRegion.textContent = message2;
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1e3);
  }, 100);
}
__name(announceToScreenReader, "announceToScreenReader");
function isVisibleToScreenReader(element) {
  const style = window.getComputedStyle(element);
  const hasAriaHidden = element.getAttribute("aria-hidden") === "true";
  const hasDisplayNone = style.display === "none";
  const hasVisibilityHidden = style.visibility === "hidden";
  const hasOpacityZero = style.opacity === "0";
  return !hasAriaHidden && !hasDisplayNone && !hasVisibilityHidden && !hasOpacityZero;
}
__name(isVisibleToScreenReader, "isVisibleToScreenReader");
function getAccessibleName(element) {
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;
  const ariaLabelledBy = element.getAttribute("aria-labelledby");
  if (ariaLabelledBy) {
    const labelledByElement = element.ownerDocument.getElementById(ariaLabelledBy);
    if (labelledByElement) {
      return labelledByElement.textContent || void 0;
    }
  }
  const textContent = element.textContent?.trim();
  if (textContent) return textContent;
  if (element.id) {
    const label = element.ownerDocument.querySelector(`label[for="${element.id}"]`);
    if (label) {
      return label.textContent?.trim() || void 0;
    }
  }
  return void 0;
}
__name(getAccessibleName, "getAccessibleName");

// lib/performance-utils.ts
function throttle(func, delay) {
  let lastCall = 0;
  let timeoutId = null;
  return (...args) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func(...args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func(...args);
      }, delay - timeSinceLastCall);
    }
  };
}
__name(throttle, "throttle");
function debounce(func, delay) {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
__name(debounce, "debounce");
function raf(callback) {
  const id = requestAnimationFrame(callback);
  return () => cancelAnimationFrame(id);
}
__name(raf, "raf");
function doubleRaf(callback) {
  let id1;
  let id2;
  id1 = requestAnimationFrame(() => {
    id2 = requestAnimationFrame(callback);
  });
  return () => {
    cancelAnimationFrame(id1);
    cancelAnimationFrame(id2);
  };
}
__name(doubleRaf, "doubleRaf");

// lib/validation-patterns.ts
var required = /* @__PURE__ */ __name((value) => {
  if (!value || typeof value === "string" && value.trim() === "") {
    return "This field is required";
  }
  return void 0;
}, "required");
var email = /* @__PURE__ */ __name((value) => {
  if (!value) return void 0;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address";
  }
  return void 0;
}, "email");
var minLength = /* @__PURE__ */ __name((min2) => {
  return (value) => {
    if (!value) return void 0;
    if (value.length < min2) {
      return `Must be at least ${min2} characters`;
    }
    return void 0;
  };
}, "minLength");
var maxLength = /* @__PURE__ */ __name((max2) => {
  return (value) => {
    if (!value) return void 0;
    if (value.length > max2) {
      return `Must be no more than ${max2} characters`;
    }
    return void 0;
  };
}, "maxLength");
var pattern = /* @__PURE__ */ __name((regex, message2) => {
  return (value) => {
    if (!value) return void 0;
    if (!regex.test(value)) {
      return message2;
    }
    return void 0;
  };
}, "pattern");
var numberRange = /* @__PURE__ */ __name((min2, max2) => {
  return (value) => {
    if (value === void 0 || value === null) return void 0;
    if (value < min2 || value > max2) {
      return `Must be between ${min2} and ${max2}`;
    }
    return void 0;
  };
}, "numberRange");
var min = /* @__PURE__ */ __name((minimum) => {
  return (value) => {
    if (value === void 0 || value === null) return void 0;
    if (value < minimum) {
      return `Must be at least ${minimum}`;
    }
    return void 0;
  };
}, "min");
var max = /* @__PURE__ */ __name((maximum) => {
  return (value) => {
    if (value === void 0 || value === null) return void 0;
    if (value > maximum) {
      return `Must be no more than ${maximum}`;
    }
    return void 0;
  };
}, "max");
var url = /* @__PURE__ */ __name((value) => {
  if (!value) return void 0;
  try {
    new URL(value);
    return void 0;
  } catch {
    return "Please enter a valid URL";
  }
}, "url");
var combine = /* @__PURE__ */ __name((...rules) => {
  return (value) => {
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return void 0;
  };
}, "combine");
var conditional = /* @__PURE__ */ __name((condition, rule) => {
  return (value) => {
    if (!condition(value)) return void 0;
    return rule(value);
  };
}, "conditional");
var createRule = /* @__PURE__ */ __name((validator, message2) => {
  return (value) => {
    if (!validator(value)) {
      return message2;
    }
    return void 0;
  };
}, "createRule");

// lib/component-api-patterns.ts
function createStandardProps(props, defaults) {
  return {
    ...defaults,
    ...props,
    className: props.className || defaults?.className
  };
}
__name(createStandardProps, "createStandardProps");

// contexts/app-provider.tsx
import { createContext, useContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var AppContext = createContext({
  sidebarOpen: false,
  setSidebarOpen: /* @__PURE__ */ __name(() => false, "setSidebarOpen"),
  sidebarExpanded: false,
  setSidebarExpanded: /* @__PURE__ */ __name(() => false, "setSidebarExpanded")
});
function AppProvider({
  children
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  return /* @__PURE__ */ jsx(AppContext.Provider, { value: { sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded }, children });
}
__name(AppProvider, "AppProvider");
var useAppProvider = /* @__PURE__ */ __name(() => useContext(AppContext), "useAppProvider");

// hooks/use-window-width.ts
import { useState as useState2, useEffect } from "react";
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState2(
    typeof window !== "undefined" ? window.innerWidth : void 0
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = /* @__PURE__ */ __name(() => {
      setWindowWidth(window.innerWidth);
    }, "handleResize");
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
}
__name(useWindowWidth, "useWindowWidth");

// hooks/use-media-query.ts
import { useState as useState3, useEffect as useEffect2 } from "react";
function useMediaQuery(query) {
  const [matches, setMatches] = useState3(false);
  useEffect2(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const handler = /* @__PURE__ */ __name((event) => {
      setMatches(event.matches);
    }, "handler");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);
  return matches;
}
__name(useMediaQuery, "useMediaQuery");
function useBreakpoint() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px) and (max-width: 1280px)");
  const isLarge = useMediaQuery("(min-width: 1281px)");
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge
  };
}
__name(useBreakpoint, "useBreakpoint");

// hooks/use-click-outside.ts
import { useEffect as useEffect3 } from "react";
function useClickOutside(ref, handler) {
  useEffect3(() => {
    const listener = /* @__PURE__ */ __name((event) => {
      const el = ref?.current;
      if (!el || el.contains(event.target)) {
        return;
      }
      handler(event);
    }, "listener");
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
__name(useClickOutside, "useClickOutside");

// hooks/use-debounce.ts
import { useState as useState4, useEffect as useEffect4 } from "react";
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState4(value);
  useEffect4(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
__name(useDebounce, "useDebounce");

// hooks/use-prefers-reduced-motion.ts
import { useState as useState5, useEffect as useEffect5 } from "react";
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState5(false);
  useEffect5(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = /* @__PURE__ */ __name((event) => {
      setPrefersReducedMotion(event.matches);
    }, "handler");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);
  return prefersReducedMotion;
}
__name(usePrefersReducedMotion, "usePrefersReducedMotion");

// hooks/use-transition-state.ts
import { useState as useState6, useEffect as useEffect6, useRef } from "react";
function useTransitionState(isOpen, options = {}) {
  const {
    enterDuration = 200,
    exitDuration = 150,
    initialMount = false,
    respectReducedMotion = true
  } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState6(
    initialMount ? isOpen ? "entered" : "exited" : "exited"
  );
  const [shouldMount, setShouldMount] = useState6(initialMount || isOpen);
  const timeoutRef = useRef(null);
  useEffect6(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const effectiveEnterDuration = respectReducedMotion && prefersReducedMotion ? 0 : enterDuration;
    const effectiveExitDuration = respectReducedMotion && prefersReducedMotion ? 0 : exitDuration;
    if (isOpen) {
      setShouldMount(true);
      requestAnimationFrame(() => {
        setState("entering");
        timeoutRef.current = setTimeout(() => {
          setState("entered");
        }, effectiveEnterDuration);
      });
    } else {
      if (shouldMount) {
        setState("exiting");
        timeoutRef.current = setTimeout(() => {
          setState("exited");
          setShouldMount(false);
        }, effectiveExitDuration);
      }
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, enterDuration, exitDuration, shouldMount, prefersReducedMotion, respectReducedMotion]);
  const endTransition = /* @__PURE__ */ __name(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (isOpen) {
      setState("entered");
    } else {
      setState("exited");
      setShouldMount(false);
    }
  }, "endTransition");
  return { state, shouldMount, endTransition };
}
__name(useTransitionState, "useTransitionState");

// hooks/use-focus-trap.ts
import { useEffect as useEffect7, useRef as useRef2 } from "react";
function useFocusTrap(isActive, containerRef, options = {}) {
  const { returnFocus = true, initialFocus = null } = options;
  const previousActiveElementRef = useRef2(null);
  useEffect7(() => {
    if (!isActive || !containerRef.current) return;
    const container = containerRef.current;
    if (returnFocus && document.activeElement instanceof HTMLElement) {
      previousActiveElementRef.current = document.activeElement;
    }
    const getFocusableElements2 = /* @__PURE__ */ __name(() => {
      const selector = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])'
      ].join(", ");
      return Array.from(container.querySelectorAll(selector)).filter(
        (el) => {
          const style = window.getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden";
        }
      );
    }, "getFocusableElements");
    const focusableElements = getFocusableElements2();
    if (focusableElements.length === 0) return;
    const elementToFocus = initialFocus || focusableElements[0];
    if (elementToFocus) {
      elementToFocus.focus();
    }
    const handleKeyDown = /* @__PURE__ */ __name((event) => {
      if (event.key !== "Tab") return;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }, "handleKeyDown");
    const handleFocusIn = /* @__PURE__ */ __name((event) => {
      const target = event.target;
      if (!container.contains(target)) {
        event.preventDefault();
        const firstElement = focusableElements[0];
        if (firstElement) {
          firstElement.focus();
        }
      }
    }, "handleFocusIn");
    container.addEventListener("keydown", handleKeyDown);
    container.addEventListener("focusin", handleFocusIn);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("focusin", handleFocusIn);
      if (returnFocus && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
      }
    };
  }, [isActive, containerRef, returnFocus, initialFocus]);
}
__name(useFocusTrap, "useFocusTrap");

// hooks/use-focus-return.ts
import { useEffect as useEffect8, useRef as useRef3 } from "react";
function useFocusReturn(shouldReturn, fallbackElement) {
  const previousActiveElementRef = useRef3(null);
  useEffect8(() => {
    if (shouldReturn) {
      if (document.activeElement instanceof HTMLElement) {
        previousActiveElementRef.current = document.activeElement;
      }
    } else {
      const elementToFocus = previousActiveElementRef.current || fallbackElement;
      if (elementToFocus) {
        requestAnimationFrame(() => {
          if (elementToFocus && document.body.contains(elementToFocus)) {
            elementToFocus.focus();
          } else if (fallbackElement && document.body.contains(fallbackElement)) {
            fallbackElement.focus();
          }
        });
      }
      previousActiveElementRef.current = null;
    }
  }, [shouldReturn, fallbackElement]);
}
__name(useFocusReturn, "useFocusReturn");

// hooks/use-async-state.ts
import { useState as useState7, useCallback, useRef as useRef4, useEffect as useEffect9 } from "react";
function useAsyncState(options = {}) {
  const {
    initialData,
    resetOnUnmount = false,
    onSuccess,
    onError
  } = options;
  const [state, setState] = useState7(
    initialData !== void 0 ? { status: "success", data: initialData } : { status: "idle" }
  );
  const isMountedRef = useRef4(true);
  useEffect9(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (resetOnUnmount) {
        setState(initialData !== void 0 ? { status: "success", data: initialData } : { status: "idle" });
      }
    };
  }, [resetOnUnmount, initialData]);
  const execute = useCallback(
    async (asyncFn) => {
      if (!isMountedRef.current) return void 0;
      setState({ status: "loading" });
      try {
        const data = await asyncFn();
        if (!isMountedRef.current) return void 0;
        setState({ status: "success", data });
        onSuccess?.(data);
        return data;
      } catch (error) {
        if (!isMountedRef.current) return void 0;
        const err = error instanceof Error ? error : new Error(String(error));
        setState({ status: "error", error: err });
        onError?.(err);
        throw err;
      }
    },
    [onSuccess, onError]
  );
  const reset = useCallback(() => {
    setState(initialData !== void 0 ? { status: "success", data: initialData } : { status: "idle" });
  }, [initialData]);
  const setData = useCallback((data) => {
    setState({ status: "success", data });
  }, []);
  const setError = useCallback((error) => {
    setState({ status: "error", error });
  }, []);
  return { state, execute, reset, setData, setError };
}
__name(useAsyncState, "useAsyncState");

// hooks/use-toggle.ts
import { useState as useState8, useCallback as useCallback2 } from "react";
function useToggle(initialValue = false) {
  const [value, setValue] = useState8(initialValue);
  const toggle = useCallback2(() => {
    setValue((prev) => !prev);
  }, []);
  const setTrue = useCallback2(() => {
    setValue(true);
  }, []);
  const setFalse = useCallback2(() => {
    setValue(false);
  }, []);
  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue
  };
}
__name(useToggle, "useToggle");

// hooks/use-counter.ts
import { useState as useState9, useCallback as useCallback3 } from "react";
function useCounter(options = {}) {
  const {
    initialValue = 0,
    min: min2,
    max: max2,
    step = 1
  } = options;
  const [value, setValue] = useState9(initialValue);
  const increment = useCallback3(() => {
    setValue((prev) => {
      const next = prev + step;
      return max2 !== void 0 ? Math.min(next, max2) : next;
    });
  }, [step, max2]);
  const decrement = useCallback3(() => {
    setValue((prev) => {
      const next = prev - step;
      return min2 !== void 0 ? Math.max(next, min2) : next;
    });
  }, [step, min2]);
  const reset = useCallback3(() => {
    setValue(initialValue);
  }, [initialValue]);
  const setValueWithBounds = useCallback3(
    (newValue) => {
      let boundedValue = newValue;
      if (min2 !== void 0) {
        boundedValue = Math.max(boundedValue, min2);
      }
      if (max2 !== void 0) {
        boundedValue = Math.min(boundedValue, max2);
      }
      setValue(boundedValue);
    },
    [min2, max2]
  );
  return {
    value,
    increment,
    decrement,
    reset,
    setValue: setValueWithBounds
  };
}
__name(useCounter, "useCounter");

// hooks/use-aria-live.ts
import { useEffect as useEffect10, useRef as useRef5 } from "react";
function useAriaLive(priority = "polite") {
  const liveRegionRef = useRef5(null);
  useEffect10(() => {
    if (typeof window === "undefined") return;
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", priority);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `;
    document.body.appendChild(liveRegion);
    liveRegionRef.current = liveRegion;
    return () => {
      if (liveRegionRef.current && document.body.contains(liveRegionRef.current)) {
        document.body.removeChild(liveRegionRef.current);
      }
    };
  }, [priority]);
  const announce = /* @__PURE__ */ __name((message2) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "";
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message2;
        }
      }, 100);
    } else {
      announceToScreenReader(message2, priority);
    }
  }, "announce");
  return announce;
}
__name(useAriaLive, "useAriaLive");

// hooks/use-throttle.ts
import { useRef as useRef6, useCallback as useCallback4 } from "react";
function useThrottle(callback, delay) {
  const lastRunRef = useRef6(0);
  const timeoutRef = useRef6(null);
  const throttledCallback = useCallback4(
    ((...args) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRunRef.current;
      if (timeSinceLastRun >= delay) {
        lastRunRef.current = now;
        callback(...args);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          lastRunRef.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastRun);
      }
    }),
    [callback, delay]
  );
  return throttledCallback;
}
__name(useThrottle, "useThrottle");

// hooks/use-form-validation.ts
import { useState as useState10, useCallback as useCallback5, useRef as useRef7 } from "react";
function useFormValidation(options = {}) {
  const { validateOnChange = false, validateOnBlur = true } = options;
  const [fields, setFields] = useState10({});
  const validationRulesRef = useRef7({});
  const validateField = useCallback5((name) => {
    const field = fields[name];
    if (!field) return true;
    const rules = validationRulesRef.current[name] || field.rules || [];
    if (rules.length === 0) return true;
    for (const rule of rules) {
      const error = rule(field.value);
      if (error) {
        setFields((prev) => ({
          ...prev,
          [name]: { ...prev[name], error, touched: true }
        }));
        return false;
      }
    }
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], error: void 0, touched: true }
    }));
    return true;
  }, [fields]);
  const setFieldValue = useCallback5(
    (name, value, rules) => {
      setFields((prev) => {
        const existingField = prev[name];
        const newField = {
          value,
          touched: existingField?.touched || false,
          error: existingField?.error,
          rules
        };
        if (rules) {
          validationRulesRef.current[name] = rules;
        }
        if (validateOnChange && (existingField?.touched || false)) {
          const validationRules = rules || validationRulesRef.current[name] || [];
          for (const rule of validationRules) {
            const error = rule(value);
            if (error) {
              newField.error = error;
              return { ...prev, [name]: newField };
            }
          }
          newField.error = void 0;
        }
        return { ...prev, [name]: newField };
      });
    },
    [validateOnChange]
  );
  const setFieldError = useCallback5((name, error) => {
    setFields((prev) => {
      const field = prev[name];
      if (!field) return prev;
      return {
        ...prev,
        [name]: { ...field, error, touched: true }
      };
    });
  }, []);
  const validateForm = useCallback5(() => {
    let isValid2 = true;
    const fieldNames = Object.keys(fields);
    for (const name of fieldNames) {
      const fieldValid = validateField(name);
      if (!fieldValid) {
        isValid2 = false;
      }
    }
    return isValid2;
  }, [fields, validateField]);
  const resetField = useCallback5((name) => {
    setFields((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
    delete validationRulesRef.current[name];
  }, []);
  const resetForm = useCallback5(() => {
    setFields({});
    validationRulesRef.current = {};
  }, []);
  const getFieldValue = useCallback5((name) => {
    return fields[name]?.value;
  }, [fields]);
  const handleBlur = useCallback5(
    (name) => {
      if (validateOnBlur) {
        validateField(name);
      } else {
        setFields((prev) => {
          const field = prev[name];
          if (!field) return prev;
          return {
            ...prev,
            [name]: { ...field, touched: true }
          };
        });
      }
    },
    [validateOnBlur, validateField]
  );
  return {
    fields,
    setFieldValue,
    setFieldError,
    validateField,
    validateForm,
    resetField,
    resetForm,
    getFieldValue
  };
}
__name(useFormValidation, "useFormValidation");

// theme/use-theme-manager.ts
import { useCallback as useCallback6, useEffect as useEffect11, useMemo, useState as useState11 } from "react";
import { useTheme } from "next-themes";

// theme/constants.ts
var radiusOptions = [
  { name: "0", value: "0rem" },
  { name: "0.3", value: "0.3rem" },
  { name: "0.5", value: "0.5rem" },
  { name: "0.75", value: "0.75rem" },
  { name: "1.0", value: "1rem" }
];
var baseColors = [
  { name: "Primary", cssVar: "--primary" },
  { name: "Primary Foreground", cssVar: "--primary-foreground" },
  { name: "Secondary", cssVar: "--secondary" },
  { name: "Secondary Foreground", cssVar: "--secondary-foreground" },
  { name: "Accent", cssVar: "--accent" },
  { name: "Accent Foreground", cssVar: "--accent-foreground" },
  { name: "Muted", cssVar: "--muted" },
  { name: "Muted Foreground", cssVar: "--muted-foreground" }
];
var colorGroups = [
  { title: "Primary Colors", colors: [{ name: "Primary", cssVar: "--primary" }, { name: "Primary Foreground", cssVar: "--primary-foreground" }] },
  { title: "Secondary Colors", colors: [{ name: "Secondary", cssVar: "--secondary" }, { name: "Secondary Foreground", cssVar: "--secondary-foreground" }] },
  { title: "Accent Colors", colors: [{ name: "Accent", cssVar: "--accent" }, { name: "Accent Foreground", cssVar: "--accent-foreground" }] },
  { title: "Base Colors", colors: [{ name: "Background", cssVar: "--background" }, { name: "Foreground", cssVar: "--foreground" }] },
  { title: "Card Colors", colors: [{ name: "Card Background", cssVar: "--card" }, { name: "Card Foreground", cssVar: "--card-foreground" }] },
  { title: "Popover Colors", colors: [{ name: "Popover Background", cssVar: "--popover" }, { name: "Popover Foreground", cssVar: "--popover-foreground" }] },
  { title: "Muted Colors", colors: [{ name: "Muted", cssVar: "--muted" }, { name: "Muted Foreground", cssVar: "--muted-foreground" }] },
  { title: "Destructive Colors", colors: [{ name: "Destructive", cssVar: "--destructive" }, { name: "Destructive Foreground", cssVar: "--destructive-foreground" }] },
  { title: "Border & Input Colors", colors: [{ name: "Border", cssVar: "--border" }, { name: "Input", cssVar: "--input" }, { name: "Ring", cssVar: "--ring" }] },
  { title: "Chart Colors", colors: [{ name: "Chart 1", cssVar: "--chart-1" }, { name: "Chart 2", cssVar: "--chart-2" }, { name: "Chart 3", cssVar: "--chart-3" }, { name: "Chart 4", cssVar: "--chart-4" }, { name: "Chart 5", cssVar: "--chart-5" }] },
  { title: "Sidebar Colors", colors: [{ name: "Sidebar Background", cssVar: "--sidebar" }, { name: "Sidebar Foreground", cssVar: "--sidebar-foreground" }, { name: "Sidebar Primary", cssVar: "--sidebar-primary" }, { name: "Sidebar Primary Foreground", cssVar: "--sidebar-primary-foreground" }, { name: "Sidebar Accent", cssVar: "--sidebar-accent" }, { name: "Sidebar Accent Foreground", cssVar: "--sidebar-accent-foreground" }, { name: "Sidebar Border", cssVar: "--sidebar-border" }, { name: "Sidebar Ring", cssVar: "--sidebar-ring" }] }
];
var fontSansOptions = [
  { value: 'var(--font-inter, "Inter", ui-sans-serif, system-ui, sans-serif)', label: "Inter (default)" },
  { value: 'ui-sans-serif, system-ui, sans-serif, "Segoe UI", Roboto, sans-serif', label: "System UI" },
  { value: '"Helvetica Neue", Helvetica, Arial, sans-serif', label: "Helvetica" }
];
var fontMonoOptions = [
  { value: "ui-monospace, SFMono-Regular, Consolas, monospace", label: "Consolas (default)" },
  { value: '"Fira Code", "Fira Mono", monospace', label: "Fira Mono" }
];
var fontSerifOptions = [
  { value: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif', label: "Georgia" },
  { value: '"Times New Roman", Times, serif', label: "Times New Roman" }
];
var sidebarVariants = [
  { name: "Default", value: "sidebar", description: "Standard sidebar layout" },
  { name: "Floating", value: "floating", description: "Floating sidebar with border" },
  { name: "Inset", value: "inset", description: "Inset sidebar with rounded corners" }
];
var sidebarCollapsibleOptions = [
  { name: "Off Canvas", value: "offcanvas", description: "Slides out of view" },
  { name: "Icon", value: "icon", description: "Collapses to icon only" },
  { name: "None", value: "none", description: "Always visible" }
];
var sidebarSideOptions = [
  { name: "Left", value: "left" },
  { name: "Right", value: "right" }
];

// theme/presets.ts
var themePresets = {
  default: {
    label: "Default",
    source: "BUILT_IN",
    styles: {
      light: {
        background: "#ffffff",
        foreground: "#0a0a0a",
        card: "#ffffff",
        "card-foreground": "#0a0a0a",
        popover: "#ffffff",
        "popover-foreground": "#0a0a0a",
        primary: "#171717",
        "primary-foreground": "#fafafa",
        secondary: "#f5f5f5",
        "secondary-foreground": "#171717",
        muted: "#f5f5f5",
        "muted-foreground": "#737373",
        accent: "#f5f5f5",
        "accent-foreground": "#171717",
        destructive: "#e7000b",
        "destructive-foreground": "#ffffff",
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#a1a1a1",
        "chart-1": "#91c5ff",
        "chart-2": "#3a81f6",
        "chart-3": "#2563ef",
        "chart-4": "#1a4eda",
        "chart-5": "#1f3fad",
        sidebar: "#fafafa",
        "sidebar-foreground": "#0a0a0a",
        "sidebar-primary": "#171717",
        "sidebar-primary-foreground": "#fafafa",
        "sidebar-accent": "#f5f5f5",
        "sidebar-accent-foreground": "#171717",
        "sidebar-border": "#e5e5e5",
        "sidebar-ring": "#a1a1a1",
        "font-sans": "Inter, ui-sans-serif, sans-serif, system-ui",
        "font-serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        "font-mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        radius: "0.625rem",
        "shadow-x": "0",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.1",
        "shadow-color": "oklch(0 0 0)",
        "shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-sm": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)",
        "tracking-normal": "0em",
        spacing: "0.25rem"
      },
      dark: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        card: "#171717",
        "card-foreground": "#fafafa",
        popover: "#262626",
        "popover-foreground": "#fafafa",
        primary: "#e5e5e5",
        "primary-foreground": "#171717",
        secondary: "#262626",
        "secondary-foreground": "#fafafa",
        muted: "#262626",
        "muted-foreground": "#a1a1a1",
        accent: "#404040",
        "accent-foreground": "#fafafa",
        destructive: "#ff6467",
        "destructive-foreground": "#fafafa",
        border: "#282828",
        input: "#343434",
        ring: "#737373",
        "chart-1": "#91c5ff",
        "chart-2": "#3a81f6",
        "chart-3": "#2563ef",
        "chart-4": "#1a4eda",
        "chart-5": "#1f3fad",
        sidebar: "#171717",
        "sidebar-foreground": "#fafafa",
        "sidebar-primary": "#1447e6",
        "sidebar-primary-foreground": "#fafafa",
        "sidebar-accent": "#262626",
        "sidebar-accent-foreground": "#fafafa",
        "sidebar-border": "#282828",
        "sidebar-ring": "#525252",
        "font-sans": "Inter, ui-sans-serif, sans-serif, system-ui",
        "font-serif": 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        "font-mono": 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        radius: "0.625rem",
        "shadow-x": "0",
        "shadow-y": "1px",
        "shadow-blur": "3px",
        "shadow-spread": "0px",
        "shadow-opacity": "0.1",
        "shadow-color": "oklch(0 0 0)",
        "shadow-2xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0 1px 3px 0px hsl(0 0% 0% / 0.05)",
        "shadow-sm": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        shadow: "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0 1px 3px 0px hsl(0 0% 0% / 0.25)"
      }
    }
  },
  "mindtris-ui": {
    label: "Mindtris UI",
    source: "BUILT_IN",
    styles: {
      light: {
        background: "#f3f4f6",
        foreground: "#4b5563",
        card: "#ffffff",
        "card-foreground": "#1f2937",
        popover: "#ffffff",
        "popover-foreground": "#1f2937",
        primary: "#111827",
        "primary-foreground": "#f9fafb",
        secondary: "#ffffff",
        "secondary-foreground": "#1f2937",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        accent: "#f1eeff",
        "accent-foreground": "#5d47de",
        destructive: "#ff5656",
        "destructive-foreground": "#ffffff",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#111827",
        "chart-1": "#755ff8",
        "chart-2": "#56b1f3",
        "chart-3": "#34bd68",
        "chart-4": "#f0bb33",
        "chart-5": "#ff5656",
        radius: "0.5rem",
        "font-sans": 'var(--font-inter, "Inter", ui-sans-serif, system-ui, sans-serif)',
        "font-mono": "ui-monospace, SFMono-Regular, Consolas, monospace",
        sidebar: "#ffffff",
        "sidebar-foreground": "#1f2937",
        "sidebar-primary": "#755ff8",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#f1eeff",
        "sidebar-accent-foreground": "#5d47de",
        "sidebar-border": "#e5e7eb",
        "sidebar-ring": "#111827"
      },
      dark: {
        background: "#111827",
        foreground: "#9ca3af",
        card: "#1f2937",
        "card-foreground": "#f3f4f6",
        popover: "#1f2937",
        "popover-foreground": "#f3f4f6",
        primary: "#8470ff",
        "primary-foreground": "#ffffff",
        secondary: "#374151",
        "secondary-foreground": "#f3f4f6",
        muted: "#374151",
        "muted-foreground": "#9ca3af",
        accent: "#4634b1",
        "accent-foreground": "#f1eeff",
        destructive: "#ff6467",
        "destructive-foreground": "#ffffff",
        border: "#374151",
        input: "#374151",
        ring: "#f3f4f6",
        "chart-1": "#8470ff",
        "chart-2": "#67bfff",
        "chart-3": "#3ec972",
        "chart-4": "#f7cd4c",
        "chart-5": "#ff6467",
        radius: "0.5rem",
        "font-sans": 'var(--font-inter, "Inter", ui-sans-serif, system-ui, sans-serif)',
        "font-mono": "ui-monospace, SFMono-Regular, Consolas, monospace",
        sidebar: "#1f2937",
        "sidebar-foreground": "#f3f4f6",
        "sidebar-primary": "#8470ff",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#4634b1",
        "sidebar-accent-foreground": "#f1eeff",
        "sidebar-border": "#374151",
        "sidebar-ring": "#f3f4f6"
      }
    }
  },
  amber: {
    label: "Amber",
    source: "BUILT_IN",
    styles: {
      light: {
        background: "#ffffff",
        foreground: "#262626",
        card: "#ffffff",
        "card-foreground": "#262626",
        popover: "#ffffff",
        "popover-foreground": "#262626",
        primary: "#f59e0b",
        "primary-foreground": "#000000",
        secondary: "#f3f4f6",
        "secondary-foreground": "#4b5563",
        muted: "#f9fafb",
        "muted-foreground": "#6b7280",
        accent: "#fffbeb",
        "accent-foreground": "#92400e",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#f59e0b",
        "chart-1": "#f59e0b",
        "chart-2": "#d97706",
        "chart-3": "#b45309",
        "chart-4": "#92400e",
        "chart-5": "#78350f",
        sidebar: "#f9fafb",
        "sidebar-foreground": "#262626",
        "sidebar-primary": "#f59e0b",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#fffbeb",
        "sidebar-accent-foreground": "#92400e",
        "sidebar-border": "#e5e7eb",
        "sidebar-ring": "#f59e0b",
        "font-sans": "Inter, sans-serif",
        "font-serif": "Source Serif 4, serif",
        "font-mono": "JetBrains Mono, monospace",
        radius: "0.375rem",
        "shadow-x": "0px",
        "shadow-y": "4px",
        "shadow-blur": "8px",
        "shadow-spread": "-1px",
        "shadow-opacity": "0.1",
        "shadow-color": "hsl(0 0% 0%)",
        "shadow-2xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-sm": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        shadow: "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.25)",
        "tracking-normal": "0em",
        spacing: "0.25rem"
      },
      dark: {
        background: "#171717",
        foreground: "#e5e5e5",
        card: "#262626",
        "card-foreground": "#e5e5e5",
        popover: "#262626",
        "popover-foreground": "#e5e5e5",
        primary: "#f59e0b",
        "primary-foreground": "#000000",
        secondary: "#262626",
        "secondary-foreground": "#e5e5e5",
        muted: "#1f1f1f",
        "muted-foreground": "#a3a3a3",
        accent: "#92400e",
        "accent-foreground": "#fde68a",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        border: "#404040",
        input: "#404040",
        ring: "#f59e0b",
        "chart-1": "#fbbf24",
        "chart-2": "#d97706",
        "chart-3": "#92400e",
        "chart-4": "#b45309",
        "chart-5": "#92400e",
        sidebar: "#0f0f0f",
        "sidebar-foreground": "#e5e5e5",
        "sidebar-primary": "#f59e0b",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#92400e",
        "sidebar-accent-foreground": "#fde68a",
        "sidebar-border": "#404040",
        "sidebar-ring": "#f59e0b",
        "font-sans": "Inter, sans-serif",
        "font-serif": "Source Serif 4, serif",
        "font-mono": "JetBrains Mono, monospace",
        radius: "0.375rem",
        "shadow-x": "0px",
        "shadow-y": "4px",
        "shadow-blur": "8px",
        "shadow-spread": "-1px",
        "shadow-opacity": "0.1",
        "shadow-color": "hsl(0 0% 0%)",
        "shadow-2xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-sm": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        shadow: "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.25)"
      }
    }
  },
  simplifi: {
    label: "Simplifi",
    source: "BUILT_IN",
    styles: {
      light: {
        // Canvas + control surfaces are distinct in this theme.
        background: "#f7f5f2",
        foreground: "#1b1b1b",
        card: "#ffffff",
        "card-foreground": "#1b1b1b",
        popover: "#ffffff",
        "popover-foreground": "#1b1b1b",
        field: "#ffffff",
        primary: "#1b1b1b",
        "primary-foreground": "#ffffff",
        secondary: "#dedede",
        "secondary-foreground": "#1b1b1b",
        // Used by `bg-muted` / `hover:bg-muted` (e.g. header menu hover surface).
        muted: "#dedede",
        "muted-foreground": "#616161",
        // Accent is a subtle highlight surface (selection, focus backgrounds).
        accent: "#f4effa",
        "accent-foreground": "#2f184b",
        destructive: "#ea4335",
        "destructive-foreground": "#ffffff",
        border: "#dedede",
        input: "#dedede",
        // Focus ring uses the accent scale (not primary).
        ring: "#9b72cf",
        "chart-1": "#4285f4",
        "chart-2": "#34a853",
        "chart-3": "#fbbc04",
        "chart-4": "#ea4335",
        "chart-5": "#532b88",
        sidebar: "#ffffff",
        "sidebar-foreground": "#1b1b1b",
        "sidebar-primary": "#1b1b1b",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#f4effa",
        "sidebar-accent-foreground": "#2f184b",
        "sidebar-border": "#dedede",
        "sidebar-ring": "#c8b1e4",
        "font-sans": "Inter, sans-serif",
        "font-serif": "Source Serif 4, serif",
        "font-mono": "JetBrains Mono, monospace",
        radius: "0.375rem",
        "shadow-x": "0px",
        "shadow-y": "4px",
        "shadow-blur": "8px",
        "shadow-spread": "-1px",
        "shadow-opacity": "0.1",
        "shadow-color": "hsl(0 0% 0%)",
        "shadow-2xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-sm": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        shadow: "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.25)",
        "tracking-normal": "0em",
        spacing: "0.25rem"
      },
      dark: {
        background: "#1b1b1b",
        foreground: "#ffffff",
        card: "#000000",
        "card-foreground": "#ffffff",
        popover: "#000000",
        "popover-foreground": "#ffffff",
        field: "#000000",
        primary: "#dedede",
        "primary-foreground": "#1b1b1b",
        secondary: "#616161",
        "secondary-foreground": "#ffffff",
        muted: "#616161",
        "muted-foreground": "#dedede",
        accent: "#2f184b",
        "accent-foreground": "#f4effa",
        destructive: "#ea4335",
        "destructive-foreground": "#ffffff",
        border: "#616161",
        input: "#616161",
        ring: "#c8b1e4",
        "chart-1": "#4285f4",
        "chart-2": "#34a853",
        "chart-3": "#fbbc04",
        "chart-4": "#ea4335",
        "chart-5": "#9b72cf",
        sidebar: "#1b1b1b",
        "sidebar-foreground": "#ffffff",
        "sidebar-primary": "#1b1b1b",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#532b88",
        "sidebar-accent-foreground": "#f4effa",
        "sidebar-border": "#616161",
        "sidebar-ring": "#c8b1e4",
        "font-sans": "Inter, sans-serif",
        "font-serif": "Source Serif 4, serif",
        "font-mono": "JetBrains Mono, monospace",
        radius: "0.375rem",
        "shadow-x": "0px",
        "shadow-y": "4px",
        "shadow-blur": "8px",
        "shadow-spread": "-1px",
        "shadow-opacity": "0.1",
        "shadow-color": "hsl(0 0% 0%)",
        "shadow-2xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-xs": "0px 4px 8px -1px hsl(0 0% 0% / 0.05)",
        "shadow-sm": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        shadow: "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 1px 2px -2px hsl(0 0% 0% / 0.10)",
        "shadow-md": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 2px 4px -2px hsl(0 0% 0% / 0.10)",
        "shadow-lg": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 4px 6px -2px hsl(0 0% 0% / 0.10)",
        "shadow-xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.10), 0px 8px 10px -2px hsl(0 0% 0% / 0.10)",
        "shadow-2xl": "0px 4px 8px -1px hsl(0 0% 0% / 0.25)"
      }
    }
  }
};

// theme/theme-data.ts
var colorThemes = Object.entries(themePresets).map(([key, preset]) => ({
  name: preset.label || key,
  value: key,
  preset
})).filter(
  (theme, index, self) => index === self.findIndex((t) => t.value === theme.value)
);

// theme/utils/hsl-transform.ts
function hexToHsl(hex) {
  const cleanHex = hex.replace("#", "");
  const fullHex = cleanHex.length === 3 ? cleanHex.split("").map((char) => char + char).join("") : cleanHex;
  if (fullHex.length !== 6) {
    return null;
  }
  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;
  const max2 = Math.max(r, g, b);
  const min2 = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max2 + min2) / 2;
  if (max2 !== min2) {
    const d = max2 - min2;
    s = l > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
    switch (max2) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: h * 360,
    s: s * 100,
    l: l * 100
  };
}
__name(hexToHsl, "hexToHsl");
function hslToHex(h, s, l) {
  h = h % 360;
  if (h < 0) h += 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return `#${[r, g, b].map((x2) => {
    const hex = x2.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("")}`;
}
__name(hslToHex, "hslToHex");
function parseRgb(color) {
  const match2 = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match2) return null;
  return {
    r: parseInt(match2[1], 10),
    g: parseInt(match2[2], 10),
    b: parseInt(match2[3], 10)
  };
}
__name(parseRgb, "parseRgb");
function applyHSLAdjustments(colorValue, hueShift = 0, saturationMult = 1, lightnessMult = 1) {
  if (!colorValue || colorValue.trim() === "") {
    return colorValue;
  }
  const trimmed = colorValue.trim();
  if (trimmed.startsWith("var(") || trimmed === "transparent" || trimmed === "currentColor") {
    return colorValue;
  }
  let hsl = hexToHsl(trimmed);
  if (!hsl) {
    const rgb = parseRgb(trimmed);
    if (rgb) {
      hsl = hexToHsl(hslToHex(0, 0, 0));
      if (hsl) {
        const r = rgb.r / 255;
        const g = rgb.g / 255;
        const b = rgb.b / 255;
        const max2 = Math.max(r, g, b);
        const min2 = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max2 + min2) / 2;
        if (max2 !== min2) {
          const d = max2 - min2;
          s = l > 0.5 ? d / (2 - max2 - min2) : d / (max2 + min2);
          switch (max2) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
            case g:
              h = ((b - r) / d + 2) / 6;
              break;
            case b:
              h = ((r - g) / d + 4) / 6;
              break;
          }
        }
        hsl = {
          h: h * 360,
          s: s * 100,
          l: l * 100
        };
      }
    }
  }
  if (!hsl) {
    return colorValue;
  }
  let adjustedH = hsl.h + hueShift;
  let adjustedS = Math.max(0, Math.min(100, hsl.s * saturationMult));
  let adjustedL = Math.max(0, Math.min(100, hsl.l * lightnessMult));
  return hslToHex(adjustedH, adjustedS, adjustedL);
}
__name(applyHSLAdjustments, "applyHSLAdjustments");
function applyHSLToThemeStyles(styles, hueShift = 0, saturationMult = 1, lightnessMult = 1) {
  const adjusted = {};
  const colorVars = [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "border",
    "input",
    "ring",
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
    "sidebar",
    "sidebar-foreground",
    "sidebar-primary",
    "sidebar-primary-foreground",
    "sidebar-accent",
    "sidebar-accent-foreground",
    "sidebar-border",
    "sidebar-ring"
  ];
  for (const [key, value] of Object.entries(styles)) {
    if (colorVars.includes(key) && value) {
      adjusted[key] = applyHSLAdjustments(value, hueShift, saturationMult, lightnessMult);
    } else {
      adjusted[key] = value;
    }
  }
  return adjusted;
}
__name(applyHSLToThemeStyles, "applyHSLToThemeStyles");

// theme/utils/shadow-utils.ts
function buildShadowValue(color = "hsl(0 0% 0%)", opacity = "0.1", blur = "3px", spread = "0px", x = "0px", y = "1px") {
  const opacityNum = parseFloat(opacity) || 0.1;
  const opacityValue = Math.max(0, Math.min(1, opacityNum));
  let shadowColor = color;
  if (color.startsWith("hsl(")) {
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
      const h = parseInt(hslMatch[1], 10);
      const s = parseInt(hslMatch[2], 10) / 100;
      const l = parseInt(hslMatch[3], 10) / 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x2 = c * (1 - Math.abs(h / 60 % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (h >= 0 && h < 60) {
        r = c;
        g = x2;
        b = 0;
      } else if (h >= 60 && h < 120) {
        r = x2;
        g = c;
        b = 0;
      } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x2;
      } else if (h >= 180 && h < 240) {
        r = 0;
        g = x2;
        b = c;
      } else if (h >= 240 && h < 300) {
        r = x2;
        g = 0;
        b = c;
      } else {
        r = c;
        g = 0;
        b = x2;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      shadowColor = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
    } else {
      shadowColor = `rgba(0, 0, 0, ${opacityValue})`;
    }
  } else if (color.startsWith("oklch(")) {
    shadowColor = color.replace(")", ` / ${opacityValue})`);
  } else if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    shadowColor = `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
  } else if (color.startsWith("rgb(")) {
    shadowColor = color.replace("rgb(", "rgba(").replace(")", `, ${opacityValue})`);
  } else {
    shadowColor = `rgba(0, 0, 0, ${opacityValue})`;
  }
  return `${x} ${y} ${blur} ${spread} ${shadowColor}`;
}
__name(buildShadowValue, "buildShadowValue");
function updateShadowTokens() {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const shadowColor = styles.getPropertyValue("--shadow-color").trim() || "hsl(0 0% 0%)";
  const shadowOpacity = styles.getPropertyValue("--shadow-opacity").trim() || "0.1";
  const shadowBlur = styles.getPropertyValue("--shadow-blur").trim() || "3px";
  const shadowSpread = styles.getPropertyValue("--shadow-spread").trim() || "0px";
  const shadowX = styles.getPropertyValue("--shadow-x").trim() || "0px";
  const shadowY = styles.getPropertyValue("--shadow-y").trim() || "1px";
  const baseShadow = buildShadowValue(shadowColor, shadowOpacity, shadowBlur, shadowSpread, shadowX, shadowY);
  if (shadowColor && shadowOpacity && shadowBlur) {
    root.style.setProperty("--shadow-sm", baseShadow);
    root.style.setProperty("--shadow-md", baseShadow);
    root.style.setProperty("--shadow-lg", baseShadow);
  }
}
__name(updateShadowTokens, "updateShadowTokens");

// theme/apply-theme.ts
function resetTheme() {
  const root = document.documentElement;
  const allPossibleVars = [
    // Standard shadcn/ui variables
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "border",
    "input",
    // Field surface (inputs, textareas, etc.)
    "field",
    "ring",
    "radius",
    // Chart variables
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
    // Sidebar variables
    "sidebar",
    "sidebar-foreground",
    "sidebar-primary",
    "sidebar-primary-foreground",
    "sidebar-accent",
    "sidebar-accent-foreground",
    "sidebar-border",
    "sidebar-ring",
    // Font variables
    "font-sans",
    "font-serif",
    "font-mono",
    // Shadow variables
    "shadow-2xs",
    "shadow-xs",
    "shadow-sm",
    "shadow",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "shadow-2xl",
    // Spacing variables
    "spacing",
    "tracking-normal",
    // Shadow (single token or component-level, tweakcn-style)
    "shadow-color",
    "shadow-opacity",
    "shadow-blur",
    "shadow-spread",
    "shadow-x",
    "shadow-y"
  ];
  allPossibleVars.forEach((varName) => {
    root.style.removeProperty(`--${varName}`);
  });
}
__name(resetTheme, "resetTheme");
var THEME_VAR_KEYS = [
  // Standard shadcn/ui variables
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  // Field surface (inputs, textareas, etc.)
  "field",
  "ring",
  "radius",
  // Chart variables
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  // Sidebar variables
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
  // Font variables
  "font-sans",
  "font-serif",
  "font-mono",
  // Shadow variables
  "shadow-2xs",
  "shadow-xs",
  "shadow-sm",
  "shadow",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
  // Spacing variables
  "spacing",
  "tracking-normal",
  // Shadow (single token or component-level, tweakcn-style)
  "shadow-color",
  "shadow-opacity",
  "shadow-blur",
  "shadow-spread",
  "shadow-x",
  "shadow-y"
];
function readComputedStringVar(varName) {
  try {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim();
  } catch {
    return "";
  }
}
__name(readComputedStringVar, "readComputedStringVar");
var PRESERVE_VARS_ACROSS_THEME_APPLY = [
  // tweakcn knobs
  "hue-shift",
  "saturation-mult",
  "lightness-mult",
  "spacing",
  "tracking-normal",
  "shadow-color",
  "shadow-opacity",
  "shadow-blur",
  "shadow-spread",
  "shadow-x",
  "shadow-y",
  // radius is treated as a knob in the editor
  "radius"
];
function applyThemePreset(preset, darkMode) {
  try {
    const preserved = {};
    PRESERVE_VARS_ACROSS_THEME_APPLY.forEach((k) => {
      const v = readComputedStringVar(k);
      if (v) preserved[k] = v;
    });
    const hueShift = parseFloat(preserved["hue-shift"] ?? "0") || 0;
    const saturationMult = parseFloat(preserved["saturation-mult"] ?? "1") || 1;
    const lightnessMult = parseFloat(preserved["lightness-mult"] ?? "1") || 1;
    resetTheme();
    let styles = darkMode ? preset.styles.dark : preset.styles.light;
    const root = document.documentElement;
    if (hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1) {
      styles = applyHSLToThemeStyles(styles, hueShift, saturationMult, lightnessMult);
    }
    Object.entries(styles).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value);
      }
    });
    Object.entries(preserved).forEach(([k, v]) => {
      root.style.setProperty(`--${k}`, v);
    });
    updateShadowTokens();
  } catch (error) {
    console.error("Failed to apply theme preset:", error);
    try {
      resetTheme();
      const styles = darkMode ? preset.styles.dark : preset.styles.light;
      const root = document.documentElement;
      Object.entries(styles).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--${key}`, value);
        }
      });
    } catch (fallbackError) {
      console.error("Fallback theme application also failed:", fallbackError);
    }
  }
}
__name(applyThemePreset, "applyThemePreset");
function applyImportedTheme(themeData, darkMode) {
  try {
    const preserved = {};
    PRESERVE_VARS_ACROSS_THEME_APPLY.forEach((k) => {
      const v = readComputedStringVar(k);
      if (v) preserved[k] = v;
    });
    const hueShift = parseFloat(preserved["hue-shift"] ?? "0") || 0;
    const saturationMult = parseFloat(preserved["saturation-mult"] ?? "1") || 1;
    const lightnessMult = parseFloat(preserved["lightness-mult"] ?? "1") || 1;
    resetTheme();
    const root = document.documentElement;
    let themeVars = darkMode ? themeData.dark : themeData.light;
    if (hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1) {
      themeVars = applyHSLToThemeStyles(themeVars, hueShift, saturationMult, lightnessMult);
    }
    Object.entries(themeVars).forEach(([variable, value]) => {
      const varName = variable.startsWith("--") ? variable.slice(2) : variable;
      if (value) {
        root.style.setProperty(`--${varName}`, value);
      }
    });
    Object.entries(preserved).forEach(([k, v]) => {
      root.style.setProperty(`--${k}`, v);
    });
    updateShadowTokens();
  } catch (error) {
    console.error("Failed to apply imported theme:", error);
    try {
      resetTheme();
      const root = document.documentElement;
      const themeVars = darkMode ? themeData.dark : themeData.light;
      Object.entries(themeVars).forEach(([variable, value]) => {
        const varName = variable.startsWith("--") ? variable.slice(2) : variable;
        if (value) {
          root.style.setProperty(`--${varName}`, value);
        }
      });
    } catch (fallbackError) {
      console.error("Fallback theme application also failed:", fallbackError);
    }
  }
}
__name(applyImportedTheme, "applyImportedTheme");
function normalizeVarKey(key) {
  return key.trim().replace(/^--/, "");
}
__name(normalizeVarKey, "normalizeVarKey");
function applyCustomThemeArtifact(theme, darkMode) {
  try {
    const root = document.documentElement;
    const other = theme.overrides?.other ?? {};
    const hueShift = parseFloat(other["hue-shift"] ?? "0") || 0;
    const saturationMult = parseFloat(other["saturation-mult"] ?? "1") || 1;
    const lightnessMult = parseFloat(other["lightness-mult"] ?? "1") || 1;
    const baseVars = theme.base.type === "preset" ? themePresets[theme.base.value]?.styles ?? themePresets.default.styles : theme.base.theme;
    let styles = darkMode ? baseVars.dark : baseVars.light;
    if (hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1) {
      styles = applyHSLToThemeStyles(styles, hueShift, saturationMult, lightnessMult);
    }
    const modeOverrides = darkMode ? theme.overrides?.dark ?? {} : theme.overrides?.light ?? {};
    const merged = { ...styles, ...modeOverrides };
    resetTheme();
    Object.entries(other).forEach(([k, v]) => {
      const key = normalizeVarKey(k);
      if (v) root.style.setProperty(`--${key}`, v);
    });
    Object.entries(merged).forEach(([k, v]) => {
      const key = normalizeVarKey(k);
      if (v) root.style.setProperty(`--${key}`, v);
    });
    updateShadowTokens();
  } catch (error) {
    console.error("Failed to apply custom theme artifact:", error);
  }
}
__name(applyCustomThemeArtifact, "applyCustomThemeArtifact");
function applyRadius(radius) {
  document.documentElement.style.setProperty("--radius", radius);
}
__name(applyRadius, "applyRadius");
function handleColorChange(cssVar, value) {
  try {
    const varName = cssVar.startsWith("--") ? cssVar : `--${cssVar}`;
    document.documentElement.style.setProperty(varName, value);
    if (cssVar === "--hue-shift" || cssVar === "--saturation-mult" || cssVar === "--lightness-mult") {
      updateShadowTokens();
    }
    if (cssVar.startsWith("--shadow-") && (cssVar.includes("color") || cssVar.includes("opacity") || cssVar.includes("blur") || cssVar.includes("spread") || cssVar.includes("x") || cssVar.includes("y"))) {
      updateShadowTokens();
    }
  } catch (error) {
    console.error(`Failed to set CSS variable ${cssVar}:`, error);
  }
}
__name(handleColorChange, "handleColorChange");

// theme/utils/persistence.ts
var STORAGE_KEY_THEME = "mindtris-ui-theme";
var STORAGE_KEY_CUSTOM_THEME = "mindtris-ui-custom-theme";
function getStoredTheme() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return localStorage.getItem(STORAGE_KEY_THEME);
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
    return null;
  }
}
__name(getStoredTheme, "getStoredTheme");
function storeTheme(themeValue) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY_THEME, themeValue);
  } catch (error) {
    console.warn("Failed to store theme in localStorage:", error);
  }
}
__name(storeTheme, "storeTheme");
function getStoredCustomTheme() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_THEME);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.warn("Failed to read custom theme from localStorage:", error);
    return null;
  }
}
__name(getStoredCustomTheme, "getStoredCustomTheme");
function storeCustomTheme(theme) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_THEME, JSON.stringify(theme));
  } catch (error) {
    console.warn("Failed to store custom theme in localStorage:", error);
  }
}
__name(storeCustomTheme, "storeCustomTheme");

// theme/utils/debounce.ts
function debounce2(func, wait) {
  let timeout = null;
  return /* @__PURE__ */ __name(function executedFunction(...args) {
    const later = /* @__PURE__ */ __name(() => {
      timeout = null;
      func(...args);
    }, "later");
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  }, "executedFunction");
}
__name(debounce2, "debounce");

// theme/utils/validation.ts
function validateHSLValue(value, type) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return {
      isValid: false,
      error: `${type} must be a number`
    };
  }
  if (type === "hue") {
    return { isValid: true };
  }
  if (type === "saturation" || type === "lightness") {
    if (numValue < 0) {
      return {
        isValid: false,
        error: `${type} multiplier cannot be negative`
      };
    }
    return { isValid: true };
  }
  return { isValid: true };
}
__name(validateHSLValue, "validateHSLValue");
function validateColorValue(value) {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "Color value cannot be empty"
    };
  }
  const trimmed = value.trim();
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const rgbPattern = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/;
  const hslPattern = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/;
  const hslaPattern = /^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*[\d.]+)?\)$/;
  const oklchPattern = /^oklch\([\d.]+%?\s+[\d.]+\s+[\d.]+\)$/;
  const cssVarPattern = /^var\(--[\w-]+\)$/;
  if (hexPattern.test(trimmed) || rgbPattern.test(trimmed) || rgbaPattern.test(trimmed) || hslPattern.test(trimmed) || hslaPattern.test(trimmed) || oklchPattern.test(trimmed) || cssVarPattern.test(trimmed) || trimmed === "transparent" || trimmed === "currentColor") {
    return { isValid: true };
  }
  return {
    isValid: false,
    error: "Invalid color format. Use hex (#ffffff), rgb(), hsl(), or oklch()"
  };
}
__name(validateColorValue, "validateColorValue");
function validateRadiusValue(value) {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "Radius value cannot be empty"
    };
  }
  const trimmed = value.trim();
  const lengthPattern = /^[\d.]+(px|rem|em|ch|ex|vh|vw|vmin|vmax|%)$/;
  const zeroPattern = /^0(px|rem|em)?$/;
  if (lengthPattern.test(trimmed) || zeroPattern.test(trimmed)) {
    const numValue = parseFloat(trimmed);
    if (numValue < 0) {
      return {
        isValid: false,
        error: "Radius cannot be negative"
      };
    }
    return { isValid: true };
  }
  return {
    isValid: false,
    error: "Invalid radius format. Use CSS length units (e.g., 0.5rem, 8px)"
  };
}
__name(validateRadiusValue, "validateRadiusValue");
function validateSpacingValue(value) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const trimmed = value.trim();
  const lengthPattern = /^[\d.]+(px|rem|em|ch|ex|vh|vw|vmin|vmax|%)$/;
  const zeroPattern = /^0(px|rem|em)?$/;
  if (lengthPattern.test(trimmed) || zeroPattern.test(trimmed)) {
    const numValue = parseFloat(trimmed);
    if (numValue < 0) {
      return {
        isValid: false,
        error: "Spacing cannot be negative"
      };
    }
    return { isValid: true };
  }
  return {
    isValid: false,
    error: "Invalid spacing format. Use CSS length units (e.g., 0.25rem, 4px)"
  };
}
__name(validateSpacingValue, "validateSpacingValue");
function validateShadowValue(value, type) {
  if (!value || value.trim() === "") {
    return { isValid: true };
  }
  const trimmed = value.trim();
  if (type === "opacity") {
    const numValue = parseFloat(trimmed);
    if (isNaN(numValue)) {
      return {
        isValid: false,
        error: "Opacity must be a number"
      };
    }
    if (numValue < 0 || numValue > 1) {
      return {
        isValid: false,
        error: "Opacity must be between 0 and 1"
      };
    }
    return { isValid: true };
  }
  const lengthPattern = /^[\d.]+(px|rem|em|ch|ex|vh|vw|vmin|vmax|%)$/;
  const zeroPattern = /^0(px|rem|em)?$/;
  if (lengthPattern.test(trimmed) || zeroPattern.test(trimmed)) {
    return { isValid: true };
  }
  return {
    isValid: false,
    error: `Invalid ${type} format. Use CSS length units (e.g., 3px, 0.5rem)`
  };
}
__name(validateShadowValue, "validateShadowValue");
function validateImportedTheme(theme) {
  if (!theme || typeof theme !== "object") {
    return {
      isValid: false,
      error: "Theme must be an object"
    };
  }
  const themeObj = theme;
  if (!themeObj.light || typeof themeObj.light !== "object") {
    return {
      isValid: false,
      error: 'Theme must have a "light" property with an object'
    };
  }
  if (!themeObj.dark || typeof themeObj.dark !== "object") {
    return {
      isValid: false,
      error: 'Theme must have a "dark" property with an object'
    };
  }
  const light = themeObj.light;
  const dark = themeObj.dark;
  const requiredVars = ["background", "foreground", "primary", "primary-foreground"];
  for (const varName of requiredVars) {
    if (!light[varName] || typeof light[varName] !== "string") {
      return {
        isValid: false,
        error: `Missing required variable in light theme: ${varName}`
      };
    }
    const colorValidation = validateColorValue(light[varName]);
    if (!colorValidation.isValid) {
      return {
        isValid: false,
        error: `Invalid color value for ${varName} in light theme: ${colorValidation.error}`
      };
    }
  }
  for (const varName of requiredVars) {
    if (!dark[varName] || typeof dark[varName] !== "string") {
      return {
        isValid: false,
        error: `Missing required variable in dark theme: ${varName}`
      };
    }
    const colorValidation = validateColorValue(dark[varName]);
    if (!colorValidation.isValid) {
      return {
        isValid: false,
        error: `Invalid color value for ${varName} in dark theme: ${colorValidation.error}`
      };
    }
  }
  return { isValid: true };
}
__name(validateImportedTheme, "validateImportedTheme");
function validateCustomThemeArtifact(theme) {
  if (!theme || typeof theme !== "object") {
    return { isValid: false, error: "Custom theme must be an object" };
  }
  const t = theme;
  if (t.version !== 1) {
    return { isValid: false, error: "Custom theme must have version: 1" };
  }
  if (!t.name || typeof t.name !== "string") {
    return { isValid: false, error: "Custom theme must have a name" };
  }
  if (!t.base || typeof t.base !== "object") {
    return { isValid: false, error: "Custom theme must have a base" };
  }
  const base = t.base;
  const baseType = base.type;
  if (baseType !== "preset" && baseType !== "imported") {
    return { isValid: false, error: 'Custom theme base.type must be "preset" or "imported"' };
  }
  if (baseType === "preset") {
    if (!base.value || typeof base.value !== "string") {
      return { isValid: false, error: "Custom theme base.value must be a string" };
    }
  } else {
    if (!base.theme || typeof base.theme !== "object") {
      return { isValid: false, error: "Custom theme base.theme must be an object" };
    }
    const importedValidation = validateImportedTheme(base.theme);
    if (!importedValidation.isValid) {
      return importedValidation;
    }
  }
  if (!t.overrides || typeof t.overrides !== "object") {
    return { isValid: false, error: "Custom theme must have overrides" };
  }
  const overrides = t.overrides;
  const maybeMaps = [
    ["light", overrides.light],
    ["dark", overrides.dark],
    ["other", overrides.other]
  ];
  for (const [key, val] of maybeMaps) {
    if (val == null) continue;
    if (typeof val !== "object") {
      return { isValid: false, error: `Custom theme overrides.${key} must be an object` };
    }
    for (const [k, v] of Object.entries(val)) {
      if (typeof v !== "string") {
        return { isValid: false, error: `Custom theme overrides.${key}.${k} must be a string` };
      }
    }
  }
  return { isValid: true };
}
__name(validateCustomThemeArtifact, "validateCustomThemeArtifact");

// theme/use-theme-manager.ts
function useThemeManager() {
  const { theme, setTheme } = useTheme();
  const [brandColorsValues, setBrandColorsValues] = useState11({});
  const [currentThemeValue, setCurrentThemeValue] = useState11(null);
  const [error, setError] = useState11(null);
  const [lastApplied, setLastApplied] = useState11(null);
  const [customTheme, setCustomTheme] = useState11(null);
  const [customThemeValue, setCustomThemeValue] = useState11(null);
  const isDarkMode = useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);
  const updateBrandColorsFromTheme = useCallback6((styles) => {
    const newValues = {};
    baseColors.forEach((color) => {
      const cssVar = color.cssVar.replace("--", "");
      if (styles[cssVar]) {
        newValues[color.cssVar] = styles[cssVar];
      }
    });
    setBrandColorsValues(newValues);
  }, []);
  useEffect11(() => {
    try {
      const storedTheme = getStoredTheme();
      const storedCustom = getStoredCustomTheme();
      if (storedCustom) {
        const customValidation = validateCustomThemeArtifact(storedCustom);
        if (customValidation.isValid) {
          const ct = storedCustom;
          setCustomTheme(ct);
          setCustomThemeValue(`custom:${ct.name.toLowerCase().replace(/\s+/g, "-")}`);
        }
      }
      if (storedTheme) {
        setCurrentThemeValue(storedTheme);
        if (storedTheme.startsWith("custom:") && storedCustom) {
          const customValidation = validateCustomThemeArtifact(storedCustom);
          if (customValidation.isValid) {
            applyCustomThemeArtifact(storedCustom, isDarkMode);
            setLastApplied({ kind: "custom", theme: storedCustom, value: storedTheme });
          }
        } else {
          const themeObj = colorThemes.find((t) => t.value === storedTheme);
          if (themeObj) {
            applyThemePreset(themeObj.preset, isDarkMode);
            updateBrandColorsFromTheme(isDarkMode ? themeObj.preset.styles.dark : themeObj.preset.styles.light);
            setLastApplied({ kind: "preset", themeValue: storedTheme });
          }
        }
      }
    } catch (err) {
      console.warn("Failed to load persisted theme:", err);
      setError("Failed to load saved theme preferences");
    }
  }, [isDarkMode, updateBrandColorsFromTheme]);
  const debouncedApplyTheme = useMemo(
    () => debounce2((themeValue, darkMode) => {
      try {
        if (themeValue.startsWith("custom:")) {
          if (!customTheme) {
            setError("Custom theme not found");
            return;
          }
          applyCustomThemeArtifact(customTheme, darkMode);
          updateBrandColorsFromTheme(darkMode ? customTheme.base.type === "preset" ? themePresets[customTheme.base.value]?.styles.dark ?? themePresets.default.styles.dark : customTheme.base.theme.dark : customTheme.base.type === "preset" ? themePresets[customTheme.base.value]?.styles.light ?? themePresets.default.styles.light : customTheme.base.theme.light);
          setCurrentThemeValue(themeValue);
          setLastApplied({ kind: "custom", theme: customTheme, value: themeValue });
          storeTheme(themeValue);
          setError(null);
          return;
        }
        const theme2 = colorThemes.find((t) => t.value === themeValue);
        if (!theme2) {
          setError(`Theme "${themeValue}" not found`);
          return;
        }
        applyThemePreset(theme2.preset, darkMode);
        updateBrandColorsFromTheme(darkMode ? theme2.preset.styles.dark : theme2.preset.styles.light);
        setCurrentThemeValue(themeValue);
        setLastApplied({ kind: "preset", themeValue });
        storeTheme(themeValue);
        setError(null);
      } catch (err) {
        console.error("Failed to apply theme:", err);
        setError(`Failed to apply theme: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }, 100),
    [customTheme, isDarkMode, updateBrandColorsFromTheme]
  );
  const applyTheme = useCallback6((themeValue, darkMode) => {
    debouncedApplyTheme(themeValue, darkMode);
  }, [debouncedApplyTheme]);
  const applyTweakcnTheme = useCallback6((themePreset, darkMode) => {
    try {
      applyThemePreset(themePreset, darkMode);
      updateBrandColorsFromTheme(darkMode ? themePreset.styles.dark : themePreset.styles.light);
      setError(null);
    } catch (err) {
      console.error("Failed to apply tweakcn theme:", err);
      setError(`Failed to apply theme: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }, [updateBrandColorsFromTheme]);
  const applyImportedThemeHandler = useCallback6((themeData, darkMode) => {
    try {
      const validation = validateImportedTheme(themeData);
      if (!validation.isValid) {
        setError(validation.error || "Invalid theme format");
        return;
      }
      applyImportedTheme(themeData, darkMode);
      setLastApplied({ kind: "imported", theme: themeData });
      const themeVars = darkMode ? themeData.dark : themeData.light;
      const newBrandColors = {};
      baseColors.forEach((color) => {
        const varName = color.cssVar.replace("--", "");
        if (themeVars[varName]) {
          newBrandColors[color.cssVar] = themeVars[varName];
        }
      });
      setBrandColorsValues(newBrandColors);
      setError(null);
    } catch (err) {
      console.error("Failed to apply imported theme:", err);
      setError(`Failed to apply imported theme: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }, []);
  const getComputedVarsForMode = useCallback6((dark) => {
    if (typeof document === "undefined") return {};
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    try {
      if (dark) root.classList.add("dark");
      else root.classList.remove("dark");
      const styles = getComputedStyle(root);
      const out = {};
      THEME_VAR_KEYS.forEach((k) => {
        const v = styles.getPropertyValue(`--${k}`).trim();
        if (v) out[k] = v;
      });
      ["hue-shift", "saturation-mult", "lightness-mult"].forEach((k) => {
        const v = styles.getPropertyValue(`--${k}`).trim();
        if (v) out[k] = v;
      });
      return out;
    } finally {
      if (hadDark) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, []);
  const saveCustomThemeArtifactFromCurrent = useCallback6((name = "Custom", layout) => {
    if (typeof document === "undefined") return null;
    if (!lastApplied) return null;
    const otherKeys = /* @__PURE__ */ new Set([
      "hue-shift",
      "saturation-mult",
      "lightness-mult",
      "spacing",
      "tracking-normal",
      "shadow-color",
      "shadow-opacity",
      "shadow-blur",
      "shadow-spread",
      "shadow-x",
      "shadow-y",
      "radius"
    ]);
    const computedLight = getComputedVarsForMode(false);
    const computedDark = getComputedVarsForMode(true);
    const other = {};
    otherKeys.forEach((k) => {
      const v = computedLight[k] ?? computedDark[k];
      if (v) other[k] = v;
    });
    const hueShift = parseFloat(other["hue-shift"] ?? "0") || 0;
    const saturationMult = parseFloat(other["saturation-mult"] ?? "1") || 1;
    const lightnessMult = parseFloat(other["lightness-mult"] ?? "1") || 1;
    const resolveBaseVars = /* @__PURE__ */ __name(() => {
      if (lastApplied.kind === "preset") {
        const preset = themePresets[lastApplied.themeValue] ?? themePresets.default;
        return { light: preset.styles.light, dark: preset.styles.dark, base: { type: "preset", value: lastApplied.themeValue } };
      }
      if (lastApplied.kind === "imported") {
        return { light: lastApplied.theme.light, dark: lastApplied.theme.dark, base: { type: "imported", theme: lastApplied.theme } };
      }
      if (lastApplied.kind === "custom") {
        const baseVars = lastApplied.theme.base.type === "preset" ? themePresets[lastApplied.theme.base.value]?.styles ?? themePresets.default.styles : lastApplied.theme.base.theme;
        return { light: baseVars.light, dark: baseVars.dark, base: lastApplied.theme.base };
      }
      return { light: themePresets.default.styles.light, dark: themePresets.default.styles.dark, base: { type: "preset", value: "default" } };
    }, "resolveBaseVars");
    const { light: baseLight, dark: baseDark, base } = resolveBaseVars();
    const baseLightAfterHsl = hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1 ? applyHSLToThemeStyles(baseLight, hueShift, saturationMult, lightnessMult) : baseLight;
    const baseDarkAfterHsl = hueShift !== 0 || saturationMult !== 1 || lightnessMult !== 1 ? applyHSLToThemeStyles(baseDark, hueShift, saturationMult, lightnessMult) : baseDark;
    const diff = /* @__PURE__ */ __name((computed, baseVars) => {
      const out = {};
      for (const k of Object.keys(baseVars)) {
        if (otherKeys.has(k)) continue;
        const cv = computed[k];
        const bv = baseVars[k];
        if (cv && bv && cv !== bv) out[k] = cv;
      }
      return out;
    }, "diff");
    const overridesLight = diff(computedLight, baseLightAfterHsl);
    const overridesDark = diff(computedDark, baseDarkAfterHsl);
    const artifact = {
      version: 1,
      name,
      base,
      overrides: {
        other,
        light: Object.keys(overridesLight).length ? overridesLight : void 0,
        dark: Object.keys(overridesDark).length ? overridesDark : void 0,
        layout
      }
    };
    storeCustomTheme(artifact);
    setCustomTheme(artifact);
    setCustomThemeValue(`custom:${name.toLowerCase().replace(/\s+/g, "-")}`);
    return artifact;
  }, [getComputedVarsForMode, lastApplied]);
  const importCustomThemeArtifact = useCallback6((theme2) => {
    try {
      const validation = validateCustomThemeArtifact(theme2);
      if (!validation.isValid) {
        setError(validation.error || "Invalid custom theme format");
        return;
      }
      const value = `custom:${theme2.name.toLowerCase().replace(/\s+/g, "-")}`;
      storeCustomTheme(theme2);
      setCustomTheme(theme2);
      setCustomThemeValue(value);
      setCurrentThemeValue(value);
      setLastApplied({ kind: "custom", theme: theme2, value });
      storeTheme(value);
      applyCustomThemeArtifact(theme2, isDarkMode);
      setError(null);
    } catch (err) {
      console.error("Failed to import custom theme artifact:", err);
      setError(`Failed to import custom theme: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }, [isDarkMode]);
  const debouncedColorChange = useMemo(
    () => debounce2((cssVar, value) => {
      try {
        handleColorChange(cssVar, value);
        const brandColor = baseColors.find((c) => c.cssVar === cssVar);
        if (brandColor) {
          setBrandColorsValues((prev) => ({
            ...prev,
            [cssVar]: value
          }));
        }
        if (cssVar === "--hue-shift" || cssVar === "--saturation-mult" || cssVar === "--lightness-mult") {
          if (lastApplied?.kind === "preset") {
            const theme2 = colorThemes.find((t) => t.value === lastApplied.themeValue);
            if (theme2) {
              applyThemePreset(theme2.preset, isDarkMode);
            }
          } else if (lastApplied?.kind === "imported") {
            applyImportedTheme(lastApplied.theme, isDarkMode);
          } else if (lastApplied?.kind === "custom") {
            applyCustomThemeArtifact(lastApplied.theme, isDarkMode);
          }
        }
        setError(null);
      } catch (err) {
        console.error(`Failed to change color ${cssVar}:`, err);
        setError(`Failed to update color: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }, 150),
    [isDarkMode, lastApplied, updateBrandColorsFromTheme]
  );
  const handleColorChange2 = useCallback6((cssVar, value) => {
    debouncedColorChange(cssVar, value);
  }, [debouncedColorChange]);
  const handleRadiusChange = useCallback6((radius) => {
    try {
      applyRadius(radius);
      setError(null);
    } catch (err) {
      console.error("Failed to change radius:", err);
      setError(`Failed to update radius: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }, []);
  return {
    theme,
    setTheme,
    isDarkMode,
    brandColorsValues,
    setBrandColorsValues,
    currentThemeValue,
    customThemeValue,
    customThemeName: customTheme?.name ?? null,
    customThemeArtifact: customTheme,
    error,
    resetTheme,
    applyTheme,
    applyTweakcnTheme,
    applyImportedTheme: applyImportedThemeHandler,
    saveCustomThemeArtifactFromCurrent,
    importCustomThemeArtifact,
    applyRadius: handleRadiusChange,
    handleColorChange: handleColorChange2,
    updateBrandColorsFromTheme,
    clearError: /* @__PURE__ */ __name(() => setError(null), "clearError")
  };
}
__name(useThemeManager, "useThemeManager");

// components/theme-customizer/index.tsx
import React44 from "react";
import { Settings, X as X9 } from "lucide-react";

// components/ui/button.tsx
import { cloneElement } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

// components/ui/tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
__name(TooltipProvider, "TooltipProvider");
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx2(TooltipProvider, { children: /* @__PURE__ */ jsx2(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
__name(Tooltip, "Tooltip");
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx2(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
__name(TooltipTrigger, "TooltipTrigger");
function TooltipContent({
  className,
  sideOffset = 0,
  variant = "default",
  children,
  ...props
}) {
  const variantClasses2 = {
    default: "bg-foreground text-background",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    // For tertiary, add a border so it reads on light themes.
    tertiary: "bg-card text-foreground border border-border"
  };
  const arrowVariantClasses = {
    default: "bg-foreground fill-foreground",
    primary: "bg-primary fill-primary",
    secondary: "bg-secondary fill-secondary",
    tertiary: "bg-card fill-card"
  };
  return /* @__PURE__ */ jsx2(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-[9999] w-fit origin-[--radix-tooltip-content-transform-origin] rounded-lg px-3 py-2 text-xs leading-5 whitespace-nowrap",
        variantClasses2[variant],
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx2(
          TooltipPrimitive.Arrow,
          {
            className: cn(
              "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
              arrowVariantClasses[variant]
            )
          }
        )
      ]
    }
  ) });
}
__name(TooltipContent, "TooltipContent");

// components/ui/button.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var baseClasses = "text-sm inline-flex items-center border border-transparent leading-5 shadow-sm transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer data-[disabled=true]:cursor-not-allowed data-[loading=true]:cursor-not-allowed";
var buttonVariants = createVariants({
  base: [
    baseClasses,
    // Only apply "disabled" visuals when explicitly disabled (not when loading).
    "data-[disabled=true]:border-border data-[disabled=true]:bg-card data-[disabled=true]:text-muted-foreground data-[disabled=true]:shadow-none",
    // Loading should keep variant colors, but look inert.
    "data-[loading=true]:shadow-none data-[loading=true]:opacity-90"
  ],
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground border-0 shadow-none hover:bg-background",
      tertiary: "bg-card border-border shadow-none hover:bg-card/95 text-primary",
      outline: "bg-card border-2 border-border text-foreground shadow-none hover:bg-muted",
      "outline-strong": "bg-card border border-primary text-foreground hover:bg-muted",
      ghost: "bg-transparent border-0 shadow-none text-foreground hover:bg-muted",
      link: "bg-transparent border-0 shadow-none text-primary underline-offset-4 hover:underline",
      // Header/menu link style: shows a rounded "box" on hover.
      menu: "bg-transparent border-0 shadow-none rounded-md text-muted-foreground hover:text-foreground hover:bg-muted",
      icon: "bg-transparent border-0 shadow-none text-muted-foreground hover:text-foreground hover:bg-muted",
      // Icon-only, minimal: no background and no border (even on hover).
      "icon-ghost": "bg-transparent border-0 shadow-none text-muted-foreground hover:text-foreground",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      "danger-outline": "bg-card border border-border text-destructive hover:bg-muted",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      "destructive-outline": "bg-card border border-border text-destructive hover:bg-muted"
    },
    weight: {
      default: "",
      strong: "font-semibold"
    },
    shape: {
      rounded: "rounded-lg",
      pill: "rounded-full"
    },
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between"
    },
    size: {
      default: "px-3 py-2",
      xs: "px-2 py-0.5 text-xs",
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2",
      lg: "px-4 py-3 text-base",
      xl: "px-5 py-3.5 text-base"
    },
    iconSize: {
      xs: "p-1.5",
      sm: "p-2",
      md: "p-2.5",
      lg: "p-3",
      xl: "p-3.5"
    },
    fullWidth: {
      true: "w-full",
      false: ""
    },
    iconOnly: {
      true: "aspect-square",
      false: ""
    }
  },
  defaultVariants: {
    variant: "primary",
    weight: "default",
    shape: "rounded",
    align: "center",
    size: "default",
    iconSize: "md",
    fullWidth: "false",
    iconOnly: "false"
  }
});
function Button({
  className,
  variant = "primary",
  size = "default",
  weight = "default",
  align = "center",
  shape = "rounded",
  motion = "none",
  isLoading = false,
  fullWidth = false,
  arrowIcon = false,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  disabled,
  tooltip,
  render,
  children,
  title: titleProp,
  ...props
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isExplicitlyDisabled = Boolean(disabled);
  const isDisabled = isExplicitlyDisabled || isLoading;
  const showLeadingIcon = Boolean(leadingIcon && !isLoading);
  const resolvedTrailingIcon = !isLoading && arrowIcon && !trailingIcon ? /* @__PURE__ */ jsx3(ChevronRight, { className: "h-4 w-4", "aria-hidden": true }) : trailingIcon;
  const showTrailingIcon = Boolean(resolvedTrailingIcon && !isLoading);
  const isIconSize = size === "icon" || size.startsWith("icon-");
  const isIconOnly = iconOnly || variant === "icon" || isIconSize;
  const ariaLabelProp = props["aria-label"];
  if (process.env.NODE_ENV !== "production") {
    if (isIconOnly && !ariaLabelProp && typeof children !== "string") {
      console.warn(
        "[Button] Icon-only buttons should include an `aria-label` for accessibility."
      );
    }
  }
  const resolveTextSize = /* @__PURE__ */ __name(() => {
    if (isIconSize) return "default";
    return size;
  }, "resolveTextSize");
  const resolveIconSize = /* @__PURE__ */ __name(() => {
    switch (size) {
      case "icon-xs":
        return "xs";
      case "icon-sm":
        return "sm";
      case "icon-md":
      case "icon":
        return "md";
      case "icon-lg":
        return "lg";
      case "icon-xl":
        return "xl";
      default:
        if (size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl") {
          return size;
        }
        return "md";
    }
  }, "resolveIconSize");
  const computedClassName = cn(
    buttonVariants({
      variant,
      weight,
      shape,
      align,
      size: isIconOnly ? void 0 : resolveTextSize(),
      iconSize: isIconOnly ? resolveIconSize() : void 0,
      iconOnly: isIconOnly ? "true" : "false",
      fullWidth: fullWidth && !isIconOnly ? "true" : "false"
    }),
    arrowIcon && "group",
    motion === "lift" && !prefersReducedMotion && "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:-translate-y-0.5 active:translate-y-0",
    className,
    render?.props?.className
  );
  const content = /* @__PURE__ */ jsxs2(Fragment, { children: [
    isLoading && /* @__PURE__ */ jsx3(
      Loader2,
      {
        className: cn("h-4 w-4 shrink-0", !prefersReducedMotion && "animate-spin"),
        "aria-hidden": true
      }
    ),
    showLeadingIcon && /* @__PURE__ */ jsx3("span", { className: "shrink-0", children: leadingIcon }),
    children != null && !isIconOnly && /* @__PURE__ */ jsx3(
      "span",
      {
        className: cn(
          "flex items-center gap-2 whitespace-nowrap",
          (isLoading || showLeadingIcon) && "ml-2",
          showTrailingIcon && "mr-2"
        ),
        children
      }
    ),
    isIconOnly && !isLoading && !showLeadingIcon && !showTrailingIcon && children,
    showTrailingIcon && /* @__PURE__ */ jsx3(
      "span",
      {
        className: cn(
          "shrink-0",
          arrowIcon && !prefersReducedMotion && "transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] opacity-0 translate-x-[-2px] group-hover:opacity-100 group-hover:translate-x-0.5 group-focus-visible:opacity-100 group-focus-visible:translate-x-0.5"
        ),
        children: resolvedTrailingIcon
      }
    )
  ] });
  if (render) {
    const renderProps = {
      ...render.props,
      ...props,
      className: computedClassName,
      // Avoid native tooltips when `tooltip` is provided.
      title: tooltip ? void 0 : titleProp ?? render.props?.title,
      "aria-busy": isLoading || void 0,
      "data-loading": isLoading ? "true" : "false",
      "data-disabled": isExplicitlyDisabled ? "true" : "false",
      children: content
    };
    if (isDisabled) {
      renderProps["aria-disabled"] = true;
      renderProps["data-disabled"] = true;
      renderProps["tabIndex"] = -1;
      renderProps["onClick"] = (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        return;
      };
    } else {
      const existingOnClick = render.props?.onClick;
      const userOnClick = props?.onClick;
      if (existingOnClick || userOnClick) {
        renderProps["onClick"] = (event) => {
          existingOnClick?.(event);
          userOnClick?.(event);
        };
      }
    }
    if (!ariaLabelProp && isIconOnly && typeof children === "string") {
      renderProps["aria-label"] = children;
    }
    const element = cloneElement(render, renderProps);
    if (tooltip && !isDisabled) {
      return /* @__PURE__ */ jsxs2(Tooltip, { children: [
        /* @__PURE__ */ jsx3(TooltipTrigger, { asChild: true, children: element }),
        /* @__PURE__ */ jsx3(TooltipContent, { sideOffset: 6, children: tooltip })
      ] });
    }
    return element;
  }
  const buttonElement = /* @__PURE__ */ jsx3(
    "button",
    {
      type: props.type ?? "button",
      className: computedClassName,
      disabled: isDisabled,
      "aria-busy": isLoading || void 0,
      "data-loading": isLoading ? "true" : "false",
      "data-disabled": isExplicitlyDisabled ? "true" : "false",
      "aria-label": isIconOnly && typeof children === "string" ? children : void 0,
      title: tooltip ? void 0 : titleProp,
      ...props,
      children: content
    }
  );
  if (tooltip && !isDisabled) {
    return /* @__PURE__ */ jsxs2(Tooltip, { children: [
      /* @__PURE__ */ jsx3(TooltipTrigger, { asChild: true, children: buttonElement }),
      /* @__PURE__ */ jsx3(TooltipContent, { sideOffset: 6, children: tooltip })
    ] });
  }
  return buttonElement;
}
__name(Button, "Button");

// components/ui/button-group.tsx
import * as React from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var ButtonGroupContext = React.createContext({
  orientation: "horizontal",
  withSeparator: true
});
function ButtonGroup({
  variant,
  size,
  orientation = "horizontal",
  withSeparator = true,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(
        "inline-flex w-fit overflow-hidden rounded-lg border border-border bg-card",
        orientation === "vertical" ? "flex-col" : "flex-row",
        withSeparator && (orientation === "vertical" ? "divide-y divide-border" : "divide-x divide-border"),
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx4(ButtonGroupContext.Provider, { value: { variant, size, orientation, withSeparator }, children })
    }
  );
}
__name(ButtonGroup, "ButtonGroup");
function ButtonGroupItem({ className, variant, size, ...props }) {
  const ctx = React.useContext(ButtonGroupContext);
  const resolvedVariant = ctx.variant ?? variant ?? "secondary";
  const resolvedSize = ctx.size ?? size;
  const rounding = ctx.orientation === "vertical" ? "rounded-none first:rounded-t-lg last:rounded-b-lg" : "rounded-none first:rounded-l-lg last:rounded-r-lg";
  const groupItemClasses = cn(
    "border-0 shadow-none",
    "focus-visible:z-10",
    rounding,
    className
  );
  return /* @__PURE__ */ jsx4(
    Button,
    {
      variant: resolvedVariant,
      size: resolvedSize,
      shape: "rounded",
      className: groupItemClasses,
      ...props
    }
  );
}
__name(ButtonGroupItem, "ButtonGroupItem");
function ButtonGroupSeparator({ orientation, className, ...props }) {
  const ctx = React.useContext(ButtonGroupContext);
  const dir = orientation ?? ctx.orientation;
  return /* @__PURE__ */ jsx4(
    "div",
    {
      "aria-hidden": "true",
      className: cn(
        "bg-border shrink-0",
        dir === "vertical" ? "h-px w-full" : "w-px h-full",
        className
      ),
      ...props
    }
  );
}
__name(ButtonGroupSeparator, "ButtonGroupSeparator");

// components/ui/toggle-group.tsx
import * as React2 from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var ToggleGroupContext = React2.createContext(null);
function normalizeType(type) {
  return type ?? "single";
}
__name(normalizeType, "normalizeType");
function ToggleGroup(props) {
  const {
    type: rawType,
    orientation = "horizontal",
    variant = "secondary",
    activeVariant = "primary",
    size,
    withSeparator = true,
    allowDeselect = true,
    className,
    children,
    // Prevent leaking non-DOM props onto the root element.
    onValueChange: _onValueChange,
    value: _value,
    defaultValue: _defaultValue,
    ...rest
  } = props;
  const type = normalizeType(rawType);
  const isControlledSingle = type === "single" && "value" in props && props.value !== void 0;
  const isControlledMultiple = type === "multiple" && "value" in props && props.value !== void 0;
  const [uncontrolledSingle, setUncontrolledSingle] = React2.useState(
    type === "single" ? "defaultValue" in props ? props.defaultValue ?? null : null : null
  );
  const [uncontrolledMultiple, setUncontrolledMultiple] = React2.useState(
    type === "multiple" ? "defaultValue" in props ? props.defaultValue ?? [] : [] : []
  );
  const singleValue = type === "single" ? isControlledSingle ? props.value ?? null : uncontrolledSingle : null;
  const multipleValue = type === "multiple" ? isControlledMultiple ? props.value ?? [] : uncontrolledMultiple : [];
  const onSingleChange = /* @__PURE__ */ __name((next) => {
    ;
    props.onValueChange?.(next);
    if (!isControlledSingle) setUncontrolledSingle(next);
  }, "onSingleChange");
  const onMultipleChange = /* @__PURE__ */ __name((next) => {
    ;
    props.onValueChange?.(next);
    if (!isControlledMultiple) setUncontrolledMultiple(next);
  }, "onMultipleChange");
  const isPressed = React2.useCallback(
    (v) => {
      return type === "single" ? singleValue === v : multipleValue.includes(v);
    },
    [multipleValue, singleValue, type]
  );
  const toggle = React2.useCallback(
    (v) => {
      if (type === "single") {
        if (singleValue === v) {
          if (!allowDeselect) return;
          onSingleChange(null);
          return;
        }
        onSingleChange(v);
        return;
      }
      if (multipleValue.includes(v)) {
        onMultipleChange(multipleValue.filter((x) => x !== v));
      } else {
        onMultipleChange([...multipleValue, v]);
      }
    },
    [allowDeselect, multipleValue, singleValue, type]
  );
  const ctx = {
    type,
    orientation,
    variant,
    activeVariant,
    size,
    withSeparator,
    allowDeselect,
    isPressed,
    toggle
  };
  const role = type === "single" ? "radiogroup" : "group";
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "toggle-group",
      "data-orientation": orientation,
      role,
      className: cn(
        "inline-flex w-fit overflow-hidden rounded-lg border border-border bg-card",
        orientation === "vertical" ? "flex-col" : "flex-row",
        withSeparator && (orientation === "vertical" ? "divide-y divide-border" : "divide-x divide-border"),
        className
      ),
      ...rest,
      children: /* @__PURE__ */ jsx5(ToggleGroupContext.Provider, { value: ctx, children })
    }
  );
}
__name(ToggleGroup, "ToggleGroup");
function ToggleGroupItem({
  value,
  className,
  variant,
  activeVariant,
  size,
  disabled,
  ...props
}) {
  const ctx = React2.useContext(ToggleGroupContext);
  if (!ctx) {
    throw new Error("ToggleGroupItem must be used within ToggleGroup");
  }
  const pressed = ctx.isPressed(value);
  const resolvedVariant = pressed ? ctx.activeVariant ?? activeVariant ?? "primary" : ctx.variant ?? variant ?? "secondary";
  const resolvedSize = ctx.size ?? size;
  const rounding = ctx.orientation === "vertical" ? "rounded-none first:rounded-t-lg last:rounded-b-lg" : "rounded-none first:rounded-l-lg last:rounded-r-lg";
  const a11yProps = ctx.type === "single" ? { role: "radio", "aria-checked": pressed } : { "aria-pressed": pressed };
  return /* @__PURE__ */ jsx5(
    Button,
    {
      ...a11yProps,
      variant: resolvedVariant,
      size: resolvedSize,
      shape: "rounded",
      disabled,
      className: cn("border-0 shadow-none focus-visible:z-10", rounding, className),
      onClick: () => ctx.toggle(value),
      ...props
    }
  );
}
__name(ToggleGroupItem, "ToggleGroupItem");

// components/ui/accordion.tsx
import * as React3 from "react";
import { ChevronDown } from "lucide-react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function Accordion({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  disabled = false,
  className,
  triggerClassName,
  contentClassName
}) {
  const triggerId = React3.useId();
  const panelId = React3.useId();
  const [internalOpen, setInternalOpen] = React3.useState(defaultOpen);
  const isControlled = open != null;
  const isOpen = isControlled ? Boolean(open) : internalOpen;
  const setOpen = React3.useCallback(
    (next) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsxs3("div", { className: cn("rounded-lg border border-border bg-card px-5 py-4", className), children: [
    /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        className: cn(
          "w-full flex items-center justify-between gap-3 text-left rounded-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          triggerClassName
        ),
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        id: triggerId,
        disabled,
        onClick: () => setOpen(!isOpen),
        children: [
          /* @__PURE__ */ jsx6("div", { className: "text-sm font-medium text-foreground", children: title }),
          /* @__PURE__ */ jsx6(
            ChevronDown,
            {
              className: cn(
                "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                isOpen && "rotate-180"
              ),
              "aria-hidden": true
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx6(
      "div",
      {
        id: panelId,
        role: "region",
        "aria-labelledby": triggerId,
        className: cn(
          "grid transition-[grid-template-rows] duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        ),
        children: /* @__PURE__ */ jsx6("div", { className: cn("overflow-hidden", contentClassName), children: /* @__PURE__ */ jsx6("div", { className: cn("pt-2 text-sm text-muted-foreground"), children }) })
      }
    )
  ] });
}
__name(Accordion, "Accordion");

// components/ui/accordion-group.tsx
import * as React4 from "react";
import { ChevronDown as ChevronDown2 } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function normalizeDomId(value) {
  return value.trim().replace(/[^a-zA-Z0-9\-_:.]/g, "-");
}
__name(normalizeDomId, "normalizeDomId");
function AccordionGroup(props) {
  const baseId = React4.useId();
  const {
    items,
    disabled = false,
    className,
    itemClassName,
    triggerClassName,
    contentClassName
  } = props;
  const mode = props.type === "multiple" ? "multiple" : "single";
  const isSingle = mode === "single";
  const singleProps = props;
  const multipleProps = props;
  const [internalSingle, setInternalSingle] = React4.useState(() => {
    if (mode === "multiple") return null;
    return singleProps.defaultValue ?? null;
  });
  const [internalMultiple, setInternalMultiple] = React4.useState(() => {
    if (mode === "single") return [];
    return multipleProps.defaultValue ?? [];
  });
  const isControlled = isSingle ? singleProps.value !== void 0 : multipleProps.value !== void 0;
  const value = isSingle ? singleProps.value ?? internalSingle : multipleProps.value ?? internalMultiple;
  const setValue = React4.useCallback(
    (next) => {
      if (isSingle) {
        const v = next ?? null;
        if (!isControlled) setInternalSingle(v);
        singleProps.onValueChange?.(v);
      } else {
        const v = Array.isArray(next) ? next : [];
        if (!isControlled) setInternalMultiple(v);
        multipleProps.onValueChange?.(v);
      }
    },
    [isControlled, isSingle, multipleProps, singleProps]
  );
  const isItemOpen = React4.useCallback(
    (id) => {
      if (isSingle) return value === id;
      return Array.isArray(value) ? value.includes(id) : false;
    },
    [isSingle, value]
  );
  const toggleItem = React4.useCallback(
    (id) => {
      if (disabled) return;
      if (isSingle) {
        const collapsible = props.collapsible ?? true;
        const currentlyOpen = value === id;
        if (currentlyOpen) {
          if (collapsible) setValue(null);
          return;
        }
        setValue(id);
        return;
      }
      const current = Array.isArray(value) ? value : [];
      if (current.includes(id)) {
        setValue(current.filter((x) => x !== id));
      } else {
        setValue([...current, id]);
      }
    },
    [disabled, isSingle, props, setValue, value]
  );
  return /* @__PURE__ */ jsx7("div", { className: cn("rounded-lg border border-border bg-card overflow-hidden", className), children: /* @__PURE__ */ jsx7("div", { className: "divide-y divide-border", children: items.map((item, idx) => {
    const open = isItemOpen(item.id);
    const itemDisabled = disabled || Boolean(item.disabled);
    const safeId = normalizeDomId(item.id || String(idx));
    const triggerId = `${baseId}-trigger-${safeId}`;
    const panelId = `${baseId}-panel-${safeId}`;
    return /* @__PURE__ */ jsxs4("div", { className: cn("px-5 py-4", itemClassName), children: [
      /* @__PURE__ */ jsxs4(
        "button",
        {
          type: "button",
          className: cn(
            "w-full flex items-center justify-between gap-3 text-left rounded-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            itemDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
            triggerClassName
          ),
          "aria-expanded": open,
          "aria-controls": panelId,
          id: triggerId,
          disabled: itemDisabled,
          onClick: () => toggleItem(item.id),
          children: [
            /* @__PURE__ */ jsx7("div", { className: "text-base font-semibold text-foreground", children: item.title }),
            /* @__PURE__ */ jsx7(
              ChevronDown2,
              {
                className: cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                  open && "rotate-180"
                ),
                "aria-hidden": true
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx7(
        "div",
        {
          id: panelId,
          role: "region",
          "aria-labelledby": triggerId,
          className: cn(
            "grid transition-[grid-template-rows] duration-[var(--duration-normal)] ease-[var(--ease-out)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          ),
          children: /* @__PURE__ */ jsx7("div", { className: cn("overflow-hidden", contentClassName), children: /* @__PURE__ */ jsx7("div", { className: "pt-3 text-sm text-muted-foreground", children: item.content }) })
        }
      )
    ] }, item.id);
  }) }) });
}
__name(AccordionGroup, "AccordionGroup");

// components/ui/avatar.tsx
import * as React5 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx8 } from "react/jsx-runtime";
var AvatarSizeContext = React5.createContext("md");
var avatarSizeClasses = {
  xs: "h-6 w-6",
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-16 w-16"
};
var fallbackTextClasses = {
  xs: "text-[10px]",
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-lg"
};
var Avatar = React5.forwardRef(({ size = "md", className, ...props }, ref) => /* @__PURE__ */ jsx8(AvatarSizeContext.Provider, { value: size, children: /* @__PURE__ */ jsx8(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative inline-flex shrink-0 rounded-full select-none align-middle bg-muted",
      avatarSizeClasses[size],
      className
    ),
    ...props
  }
) }));
Avatar.displayName = "Avatar";
var AvatarImage = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx8(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full overflow-hidden rounded-full object-cover", className),
    draggable: false,
    ...props
  }
));
AvatarImage.displayName = "AvatarImage";
var fallbackVariantClasses = {
  default: "bg-transparent text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  tertiary: "bg-muted text-foreground",
  "chart-1": "bg-[var(--chart-1)] text-primary-foreground",
  "chart-2": "bg-[var(--chart-2)] text-primary-foreground",
  "chart-3": "bg-[var(--chart-3)] text-primary-foreground",
  "chart-4": "bg-[var(--chart-4)] text-primary-foreground",
  "chart-5": "bg-[var(--chart-5)] text-primary-foreground"
};
var AvatarFallback = React5.forwardRef(({ size: sizeProp, variant = "default", className, ...props }, ref) => {
  const sizeFromContext = React5.useContext(AvatarSizeContext);
  const size = sizeProp ?? sizeFromContext;
  return /* @__PURE__ */ jsx8(
    AvatarPrimitive.Fallback,
    {
      ref,
      className: cn(
        "flex h-full w-full overflow-hidden rounded-full items-center justify-center font-semibold uppercase",
        fallbackTextClasses[size],
        fallbackVariantClasses[variant],
        className
      ),
      ...props
    }
  );
});
AvatarFallback.displayName = "AvatarFallback";
var badgeVariantClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  muted: "bg-muted",
  accent: "bg-accent"
};
var badgeSizeClasses = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5"
};
var AvatarBadge = React5.forwardRef(
  ({ variant = "primary", size: sizeProp, className, ...props }, ref) => {
    const sizeFromContext = React5.useContext(AvatarSizeContext);
    const size = sizeProp ?? sizeFromContext;
    return /* @__PURE__ */ jsx8(
      "span",
      {
        ref,
        role: "presentation",
        "aria-hidden": true,
        className: cn(
          "absolute right-0 bottom-0 z-10 shrink-0 rounded-full aspect-square inline-flex items-center justify-center ring-2 ring-background",
          badgeSizeClasses[size],
          badgeVariantClasses[variant],
          className
        ),
        ...props
      }
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";
var overlapClasses = {
  "2xs": "-space-x-[2px]",
  xs: "-space-x-2",
  sm: "-space-x-3",
  md: "-space-x-4",
  lg: "-space-x-7"
};
function AvatarGroup({
  overlap = "md",
  withRing = false,
  className,
  itemClassName,
  children,
  ...props
}) {
  const items = React5.Children.toArray(children);
  return /* @__PURE__ */ jsx8(
    "div",
    {
      className: cn("flex items-center", overlapClasses[overlap], className),
      ...props,
      children: items.map((child, idx) => /* @__PURE__ */ jsx8(
        "span",
        {
          className: cn(
            "relative inline-flex shrink-0 rounded-full",
            withRing && "ring-2 ring-background",
            itemClassName
          ),
          style: { zIndex: idx + 1 },
          children: child
        },
        idx
      ))
    }
  );
}
__name(AvatarGroup, "AvatarGroup");
var groupCountSizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-7 w-7 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-16 w-16 text-base"
};
function AvatarGroupCount({
  size = "md",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx8(
    "span",
    {
      className: cn(
        "inline-flex shrink-0 items-center justify-center rounded-full aspect-square font-medium bg-muted text-muted-foreground select-none",
        groupCountSizeClasses[size],
        className
      ),
      ...props,
      children
    }
  );
}
__name(AvatarGroupCount, "AvatarGroupCount");

// components/ui/alert.tsx
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var alertVariants = createVariants({
  base: "rounded-xl border p-4",
  variants: {
    variant: {
      default: "bg-card border-border text-foreground",
      accent: "bg-accent/40 border-border text-foreground",
      destructive: "bg-destructive/10 border-destructive/25 text-foreground"
    }
  },
  defaultVariants: { variant: "default" }
});
function Alert({
  variant = "default",
  icon,
  title,
  description,
  action,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx9("div", { className: cn(alertVariants({ variant }), className), role: "status", ...props, children: /* @__PURE__ */ jsxs5("div", { className: "flex items-start gap-3", children: [
    icon ? /* @__PURE__ */ jsx9("div", { className: "mt-0.5 text-muted-foreground", children: icon }) : null,
    /* @__PURE__ */ jsxs5("div", { className: "min-w-0 flex-1", children: [
      title ? /* @__PURE__ */ jsx9("div", { className: "text-sm font-semibold text-foreground", children: title }) : null,
      description ? /* @__PURE__ */ jsx9("div", { className: "mt-1 text-sm text-muted-foreground", children: description }) : null
    ] }),
    action ? /* @__PURE__ */ jsx9("div", { className: "shrink-0", children: action }) : null
  ] }) });
}
__name(Alert, "Alert");

// components/ui/aspect-ratio.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var ratioMap = {
  square: "1 / 1",
  video: "16 / 9",
  "video-wide": "21 / 9",
  portrait: "3 / 4"
};
function AspectRatio({
  ratio = "video",
  className,
  children,
  style,
  ...props
}) {
  const aspectValue = ratio === "auto" ? void 0 : ratioMap[ratio] ?? (typeof ratio === "string" ? ratio.replace(/\s/g, " / ") : void 0);
  return /* @__PURE__ */ jsx10(
    "div",
    {
      "data-slot": "aspect-ratio",
      "data-ratio": ratio,
      className: cn("relative w-full overflow-hidden", className),
      style: {
        ...style,
        aspectRatio: aspectValue
      },
      ...props,
      children
    }
  );
}
__name(AspectRatio, "AspectRatio");

// components/ui/badge.tsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
var badgeVariants = createVariants({
  base: "inline-flex items-center font-medium whitespace-nowrap select-none rounded-full",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground border border-border",
      tertiary: "bg-card border border-border text-primary",
      accent: "bg-accent text-accent-foreground",
      muted: "bg-muted text-muted-foreground",
      outline: "bg-transparent text-foreground border border-border",
      ghost: "bg-transparent text-muted-foreground",
      destructive: "bg-destructive/15 text-destructive border border-destructive/30",
      inverse: "bg-foreground text-background"
    },
    size: {
      xs: "text-xs px-2.5 py-0.5",
      sm: "text-xs px-2.5 py-1",
      md: "text-sm px-3 py-1"
    }
  },
  defaultVariants: { variant: "muted", size: "sm" }
});
function Badge({ variant = "muted", size = "sm", leadingIcon, trailingIcon, className, children, ...props }) {
  return /* @__PURE__ */ jsxs6("span", { className: cn(badgeVariants({ variant, size }), className), ...props, children: [
    leadingIcon ? /* @__PURE__ */ jsx11("span", { className: "mr-1 shrink-0 [&_svg]:size-3.5", "aria-hidden": "true", children: leadingIcon }) : null,
    /* @__PURE__ */ jsx11("span", { children }),
    trailingIcon ? /* @__PURE__ */ jsx11("span", { className: "ml-1 shrink-0 [&_svg]:size-3.5", "aria-hidden": "true", children: trailingIcon }) : null
  ] });
}
__name(Badge, "Badge");

// components/ui/breadcrumb.tsx
import { ChevronRight as ChevronRight2 } from "lucide-react";
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
function Separator({ separator }) {
  if (separator === "slash") return /* @__PURE__ */ jsx12("span", { className: "px-2 text-muted-foreground/70", children: "/" });
  if (separator === "dot") return /* @__PURE__ */ jsx12("span", { className: "px-2 text-muted-foreground/70", children: "\xB7" });
  if (separator === "chevron") return /* @__PURE__ */ jsx12(ChevronRight2, { className: "mx-2 h-4 w-4 text-muted-foreground/70", "aria-hidden": true });
  return /* @__PURE__ */ jsx12("span", { className: "px-2 text-muted-foreground/70", children: separator });
}
__name(Separator, "Separator");
function Breadcrumb({ items, separator = "slash", className, ...props }) {
  return /* @__PURE__ */ jsx12("nav", { "aria-label": "Breadcrumb", className: cn(className), ...props, children: /* @__PURE__ */ jsx12("ol", { className: "inline-flex flex-wrap items-center text-sm font-medium", children: items.map((item, idx) => {
    const isLast = idx === items.length - 1;
    const isCurrent = Boolean(item.current) || isLast;
    const linkClass = cn(
      "transition-colors",
      isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );
    return /* @__PURE__ */ jsxs7("li", { className: "inline-flex items-center", children: [
      item.href ? /* @__PURE__ */ jsx12("a", { href: item.href, onClick: item.onClick, "aria-current": isCurrent ? "page" : void 0, className: linkClass, children: item.label }) : /* @__PURE__ */ jsx12("span", { "aria-current": isCurrent ? "page" : void 0, className: linkClass, children: item.label }),
      !isLast ? /* @__PURE__ */ jsx12(Separator, { separator }) : null
    ] }, idx);
  }) }) });
}
__name(Breadcrumb, "Breadcrumb");

// components/ui/pagination.tsx
import { ChevronLeft, ChevronRight as ChevronRight3 } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function clamp(n, min2, max2) {
  return Math.max(min2, Math.min(max2, n));
}
__name(clamp, "clamp");
function buildPageTokens(page, total, maxButtons) {
  const safeMax = Math.max(5, maxButtons);
  if (total <= safeMax) return Array.from({ length: total }, (_, i) => i + 1);
  const first = 1;
  const last = total;
  const windowSize = safeMax - 2;
  const half = Math.floor(windowSize / 2);
  let start = page - half;
  let end = page + half;
  if (start < 2) {
    start = 2;
    end = start + windowSize - 1;
  }
  if (end > last - 1) {
    end = last - 1;
    start = end - windowSize + 1;
  }
  const tokens = [first];
  if (start > 2) tokens.push("ellipsis");
  for (let i = start; i <= end; i++) tokens.push(i);
  if (end < last - 1) tokens.push("ellipsis");
  tokens.push(last);
  return tokens;
}
__name(buildPageTokens, "buildPageTokens");
function Pagination({
  page,
  totalPages,
  onPageChange,
  variant = "numeric",
  maxButtons = 7,
  summary,
  className,
  ...props
}) {
  const current = clamp(page, 1, Math.max(1, totalPages));
  const canPrev = current > 1;
  const canNext = current < totalPages;
  if (variant === "classic") {
    return /* @__PURE__ */ jsxs8("nav", { className: cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", className), "aria-label": "Pagination", ...props, children: [
      /* @__PURE__ */ jsx13("div", { className: "order-2 sm:order-1", children: /* @__PURE__ */ jsxs8("div", { className: "flex justify-center sm:justify-start gap-2", children: [
        /* @__PURE__ */ jsx13(Button, { variant: "secondary", size: "sm", disabled: !canPrev, onClick: () => onPageChange(current - 1), children: "\u2190 Previous" }),
        /* @__PURE__ */ jsx13(Button, { variant: "secondary", size: "sm", disabled: !canNext, onClick: () => onPageChange(current + 1), children: "Next \u2192" })
      ] }) }),
      summary ? /* @__PURE__ */ jsx13("div", { className: "order-1 sm:order-2 text-sm text-muted-foreground text-center sm:text-left", children: summary }) : null
    ] });
  }
  const tokens = buildPageTokens(current, totalPages, maxButtons);
  return /* @__PURE__ */ jsx13("nav", { className: cn("flex justify-center", className), "aria-label": "Pagination", ...props, children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsx13(
      Button,
      {
        variant: "secondary",
        size: "icon-sm",
        "aria-label": "Previous page",
        disabled: !canPrev,
        onClick: () => onPageChange(current - 1),
        children: /* @__PURE__ */ jsx13(ChevronLeft, { className: "h-4 w-4", "aria-hidden": true })
      }
    ),
    /* @__PURE__ */ jsx13("div", { className: "mx-2 inline-flex rounded-lg border border-border overflow-hidden", children: tokens.map((t, idx) => {
      if (t === "ellipsis") {
        return /* @__PURE__ */ jsx13("span", { className: "inline-flex items-center justify-center px-3 py-2 text-sm text-muted-foreground bg-card", children: "\u2026" }, `e-${idx}`);
      }
      const isActive = t === current;
      return /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: () => onPageChange(t),
          "aria-current": isActive ? "page" : void 0,
          className: cn(
            "inline-flex items-center justify-center px-3.5 py-2 text-sm font-medium transition-colors",
            "bg-card hover:bg-muted border-r border-border last:border-r-0",
            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
          ),
          children: t
        },
        t
      );
    }) }),
    /* @__PURE__ */ jsx13(
      Button,
      {
        variant: "secondary",
        size: "icon-sm",
        "aria-label": "Next page",
        disabled: !canNext,
        onClick: () => onPageChange(current + 1),
        children: /* @__PURE__ */ jsx13(ChevronRight3, { className: "h-4 w-4", "aria-hidden": true })
      }
    )
  ] }) });
}
__name(Pagination, "Pagination");

// components/ui/card.tsx
import * as React6 from "react";
import { jsx as jsx14 } from "react/jsx-runtime";
var CardSizeContext = React6.createContext("default");
function Card({
  children,
  className = "",
  size = "default",
  shadow = "none",
  border = true,
  rounded = "lg",
  background = "white",
  hover = false
}) {
  const shadowClasses = {
    none: "",
    sm: "shadow-[var(--shadow-sm)]",
    md: "shadow-[var(--shadow-md)]",
    lg: "shadow-[var(--shadow-lg)]"
  };
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl"
  };
  const backgroundClasses = {
    white: "bg-card",
    gray: "bg-muted",
    transparent: "bg-transparent"
  };
  return /* @__PURE__ */ jsx14(CardSizeContext.Provider, { value: size, children: /* @__PURE__ */ jsx14(
    "div",
    {
      "data-slot": "card",
      "data-size": size,
      className: cn(
        "relative overflow-hidden flex flex-col",
        shadowClasses[shadow],
        border && "border border-border",
        roundedClasses[rounded],
        backgroundClasses[background],
        hover && "transition-all duration-200 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5",
        className
      ),
      children
    }
  ) });
}
__name(Card, "Card");
function DashboardCard({ children, className, ...props }) {
  return /* @__PURE__ */ jsx14(Card, { size: "default", shadow: "md", border: true, rounded: "lg", background: "white", className, ...props, children });
}
__name(DashboardCard, "DashboardCard");
function StatCard({ children, className, ...props }) {
  return /* @__PURE__ */ jsx14(Card, { size: "default", shadow: "sm", border: true, rounded: "md", background: "white", className, ...props, children });
}
__name(StatCard, "StatCard");
function SimpleCard({ children, className, ...props }) {
  return /* @__PURE__ */ jsx14(Card, { size: "default", shadow: "none", border: false, rounded: "none", background: "transparent", className, ...props, children });
}
__name(SimpleCard, "SimpleCard");
function useCardSize() {
  return React6.useContext(CardSizeContext);
}
__name(useCardSize, "useCardSize");
function CardHeader({ children, className = "" }) {
  const size = useCardSize();
  const padding = size === "sm" ? "p-4" : "p-6";
  return /* @__PURE__ */ jsx14("div", { "data-slot": "card-header", className: cn("grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5", padding, className), children });
}
__name(CardHeader, "CardHeader");
function CardTitle({ children, className = "" }) {
  return /* @__PURE__ */ jsx14("h3", { "data-slot": "card-title", className: cn("text-lg font-semibold text-foreground", className), children });
}
__name(CardTitle, "CardTitle");
function CardDescription({ children, className = "" }) {
  return /* @__PURE__ */ jsx14("p", { "data-slot": "card-description", className: cn("text-sm text-muted-foreground mt-1", className), children });
}
__name(CardDescription, "CardDescription");
function CardAction({ children, className = "" }) {
  return /* @__PURE__ */ jsx14("div", { "data-slot": "card-action", className: cn("col-start-2 row-span-2 row-start-1 self-start", className), children });
}
__name(CardAction, "CardAction");
function CardImage({ children, className = "" }) {
  return /* @__PURE__ */ jsx14("div", { "data-slot": "card-image", className: cn("overflow-hidden rounded-t-lg w-full bg-muted", className), children });
}
__name(CardImage, "CardImage");
function CardContent({ children, className = "" }) {
  const size = useCardSize();
  const padding = size === "sm" ? "px-4 pb-4" : "px-6 pb-6";
  return /* @__PURE__ */ jsx14("div", { "data-slot": "card-content", className: cn(padding, className), children });
}
__name(CardContent, "CardContent");
function CardFooter({ children, className = "" }) {
  const size = useCardSize();
  const padding = size === "sm" ? "p-4 pt-0" : "p-6 pt-0";
  return /* @__PURE__ */ jsx14("div", { "data-slot": "card-footer", className: cn("border-t border-border", padding, className), children });
}
__name(CardFooter, "CardFooter");

// components/ui/input.tsx
import React7 from "react";
import { jsx as jsx15 } from "react/jsx-runtime";
var sizeClasses = {
  sm: "h-8 text-xs px-2.5 rounded-md",
  md: "h-10 text-sm px-3 rounded-lg",
  lg: "h-12 text-base px-4 rounded-lg"
};
var Input = React7.forwardRef(
  ({ className, type, size = "md", ...props }, ref) => {
    return /* @__PURE__ */ jsx15(
      "input",
      {
        type,
        "data-slot": "input",
        className: cn(
          "w-full rounded-lg border border-input bg-field text-sm text-foreground leading-5 shadow-none",
          // Native file inputs vary by browser; for consistent UI, prefer `FileInput`.
          // We only style the selector button here (token-driven).
          type === "file" && "cursor-pointer file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-background file:text-muted-foreground file:text-xs file:font-medium",
          "placeholder:text-muted-foreground",
          "hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40",
          "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
          sizeClasses[size],
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
var Radio = React7.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx15(
      "input",
      {
        type: "radio",
        className: cn(
          "h-4 w-4 rounded-full border-input bg-field text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Radio.displayName = "Radio";

// components/ui/input-otp.tsx
import * as React8 from "react";
import { OTPInput } from "input-otp";
import { jsx as jsx16, jsxs as jsxs9 } from "react/jsx-runtime";
var InputOTPContext = React8.createContext(null);
var InputOTPVariantContext = React8.createContext("connected");
function useInputOTPContext() {
  const ctx = React8.useContext(InputOTPContext);
  if (!ctx) {
    throw new Error("InputOTPSlot must be used within InputOTP.");
  }
  return ctx;
}
__name(useInputOTPContext, "useInputOTPContext");
function useInputOTPVariant() {
  return React8.useContext(InputOTPVariantContext);
}
__name(useInputOTPVariant, "useInputOTPVariant");
function InputOTP({
  className,
  containerClassName,
  children,
  disabled,
  slotVariant = "connected",
  ...props
}) {
  return /* @__PURE__ */ jsx16(
    OTPInput,
    {
      "data-slot": "input-otp",
      "data-slot-variant": slotVariant,
      "data-disabled": disabled ? "true" : void 0,
      disabled,
      className,
      containerClassName: cn(
        "group flex items-center",
        slotVariant === "connected" && "gap-2",
        slotVariant === "boxed" && "gap-3",
        disabled ? "cursor-not-allowed opacity-50" : void 0,
        containerClassName
      ),
      render: (renderProps) => /* @__PURE__ */ jsx16(InputOTPVariantContext.Provider, { value: slotVariant, children: /* @__PURE__ */ jsx16(InputOTPContext.Provider, { value: renderProps, children }) }),
      ...props
    }
  );
}
__name(InputOTP, "InputOTP");
function InputOTPGroup({ className, ...props }) {
  const variant = useInputOTPVariant();
  return /* @__PURE__ */ jsx16(
    "div",
    {
      "data-slot": "input-otp-group",
      "data-variant": variant,
      className: cn(
        "flex items-center",
        variant === "boxed" && "gap-3",
        className
      ),
      ...props
    }
  );
}
__name(InputOTPGroup, "InputOTPGroup");
function InputOTPSeparator({ orientation = "vertical", className, ...props }) {
  return /* @__PURE__ */ jsx16(
    "div",
    {
      "data-slot": "input-otp-separator",
      "data-orientation": orientation,
      role: "separator",
      "aria-orientation": orientation,
      className: cn(
        "shrink-0 self-center bg-border",
        orientation === "vertical" && "mx-2 h-4 w-px",
        orientation === "horizontal" && "my-0 mx-1.5 h-px w-4",
        className
      ),
      ...props
    }
  );
}
__name(InputOTPSeparator, "InputOTPSeparator");
var slotSizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base"
};
function InputOTPSlot({ index, size = "md", className, ...props }) {
  const { slots } = useInputOTPContext();
  const variant = useInputOTPVariant();
  const slot = slots[index];
  if (!slot) {
    return null;
  }
  const isBoxed = variant === "boxed";
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": slot.isActive ? "true" : "false",
      "data-variant": variant,
      className: cn(
        "relative flex items-center justify-center",
        "transition-[border-color,background-color] duration-150 ease-out",
        "hover:border-border/80",
        "data-[active=true]:border-foreground/40 data-[active=true]:outline-none data-[active=true]:ring-0",
        "aria-invalid:border-destructive",
        "group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:opacity-50",
        isBoxed ? "border border-input rounded-lg bg-field text-foreground" : "border-y border-r border-input bg-field text-foreground first:rounded-l-lg first:border-l last:rounded-r-lg",
        slotSizeClasses[size],
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx16(
          "span",
          {
            "data-slot": "input-otp-slot-char",
            className: cn(slot.char ? "text-foreground" : "text-muted-foreground"),
            children: slot.char ?? slot.placeholderChar
          }
        ),
        slot.hasFakeCaret ? /* @__PURE__ */ jsx16(
          "span",
          {
            "data-slot": "input-otp-slot-caret",
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-0 flex items-center justify-center",
            children: /* @__PURE__ */ jsx16("span", { className: "h-4 w-px bg-foreground animate-pulse" })
          }
        ) : null
      ]
    }
  );
}
__name(InputOTPSlot, "InputOTPSlot");
var singleSizeClasses = {
  sm: "h-8 text-xs px-2.5 rounded-md",
  md: "h-10 text-sm px-3 rounded-lg",
  lg: "h-12 text-base px-4 rounded-lg"
};
var InputOTPSingle = React8.forwardRef(
  ({ className, maxLength: maxLength2 = 6, digitsOnly = true, size = "md", value, onChange, ...props }, ref) => {
    const handleChange = /* @__PURE__ */ __name((e) => {
      let next = e.target.value;
      if (digitsOnly) next = next.replace(/\D/g, "");
      if (maxLength2 != null) next = next.slice(0, maxLength2);
      e.target.value = next;
      onChange?.(e);
    }, "handleChange");
    return /* @__PURE__ */ jsx16(
      "input",
      {
        ref,
        type: "text",
        inputMode: digitsOnly ? "numeric" : "text",
        autoComplete: "one-time-code",
        "data-slot": "input-otp-single",
        maxLength: maxLength2,
        value,
        onChange: handleChange,
        className: cn(
          "w-full rounded-lg border border-input bg-field text-foreground leading-5 shadow-none",
          "placeholder:text-muted-foreground",
          "transition-[border-color] duration-150 ease-out",
          "hover:border-border/80 focus:outline-none focus:ring-0 focus:border-foreground/40",
          "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
          "aria-invalid:border-destructive",
          singleSizeClasses[size],
          className
        ),
        ...props
      }
    );
  }
);
InputOTPSingle.displayName = "InputOTPSingle";

// components/ui/file-input.tsx
import * as React9 from "react";
import { jsx as jsx17, jsxs as jsxs10 } from "react/jsx-runtime";
function FileInput({
  id,
  name,
  accept,
  multiple,
  disabled,
  required: required2,
  onChange,
  className,
  emptyLabel = "No file chosen",
  buttonLabel = "Choose file",
  ...props
}) {
  const inputRef = React9.useRef(null);
  const [label, setLabel] = React9.useState(emptyLabel);
  const openPicker = React9.useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);
  const handleChange = React9.useCallback(
    (e) => {
      const files = e.currentTarget.files;
      if (!files || files.length === 0) {
        setLabel(emptyLabel);
      } else if (files.length === 1) {
        setLabel(files[0]?.name ?? emptyLabel);
      } else {
        setLabel(`${files.length} files`);
      }
      onChange?.(e);
    },
    [emptyLabel, onChange]
  );
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      "data-slot": "file-input",
      className: cn(
        // Slightly tighter left padding so the button sits a bit more left.
        "w-full h-10 rounded-lg border border-input bg-field pl-2.5 pr-3",
        "flex items-center gap-3",
        "hover:border-border/80 focus-within:border-foreground/40",
        disabled && "opacity-50 cursor-not-allowed",
        className
      ),
      onClick: openPicker,
      children: [
        /* @__PURE__ */ jsx17(
          "input",
          {
            ref: inputRef,
            id,
            name,
            type: "file",
            accept,
            multiple,
            disabled,
            required: required2,
            onChange: handleChange,
            className: "sr-only",
            ...props
          }
        ),
        /* @__PURE__ */ jsx17(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              openPicker();
            },
            disabled,
            className: cn(
              "shrink-0",
              "inline-flex items-center justify-center",
              "rounded-md border border-transparent",
              "bg-primary text-primary-foreground",
              "px-3 py-1.5 text-xs font-medium",
              "focus-visible:outline-none focus-visible:ring-0"
            ),
            children: buttonLabel
          }
        ),
        /* @__PURE__ */ jsx17("span", { className: cn("min-w-0 truncate text-sm", label === emptyLabel ? "text-muted-foreground" : "text-foreground"), children: label })
      ]
    }
  );
}
__name(FileInput, "FileInput");

// components/ui/input-group.tsx
import * as React12 from "react";

// components/ui/textarea.tsx
import React11 from "react";
import { Tiptap, useEditor, useTiptap } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image2 from "@tiptap/extension-image";
import { Bold, Italic, Strikethrough, List, ListOrdered, Paperclip, Smile, Code, Link as LinkIcon } from "lucide-react";

// components/ui/popover.tsx
import * as React10 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx18 } from "react/jsx-runtime";
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverContent = React10.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx18(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx18(
  PopoverPrimitive.Content,
  {
    "data-slot": "popover-content",
    ref,
    align,
    sideOffset,
    className: cn(
      "z-[9999] w-72 rounded-lg border border-border bg-popover text-popover-foreground p-4 shadow-lg outline-hidden",
      "origin-[--radix-popover-content-transform-origin]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// components/ui/textarea.tsx
import { Fragment as Fragment2, jsx as jsx19, jsxs as jsxs11 } from "react/jsx-runtime";
var sizeClasses2 = {
  sm: "px-2 py-1",
  md: "px-3 py-2",
  lg: "px-4 py-3"
};
var Textarea = React11.forwardRef(
  ({ className, size = "md", ...props }, ref) => {
    return /* @__PURE__ */ jsx19(
      "textarea",
      {
        ref,
        className: cn(
          "block w-full min-h-[6rem] resize-y rounded-lg border border-input bg-field text-sm text-foreground leading-5 shadow-none cursor-text m-0",
          "placeholder:text-muted-foreground",
          "hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40",
          // Use a slightly translucent muted surface so borders remain visible (esp. in themes where
          // `muted` and `input` are the same color, which can make stacked disabled fields look “merged”).
          "disabled:bg-muted/60 disabled:text-muted-foreground disabled:cursor-not-allowed",
          sizeClasses2[size],
          className
        ),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
var richTextSizeClasses = {
  sm: "px-2 py-1 min-h-[5rem]",
  md: "px-3 py-2 min-h-[6rem]",
  lg: "px-4 py-3 min-h-[7rem]"
};
var COMMON_EMOJIS = [
  "\u{1F600}",
  "\u{1F603}",
  "\u{1F604}",
  "\u{1F601}",
  "\u{1F606}",
  "\u{1F605}",
  "\u{1F923}",
  "\u{1F602}",
  "\u{1F642}",
  "\u{1F643}",
  "\u{1F609}",
  "\u{1F60A}",
  "\u{1F607}",
  "\u{1F970}",
  "\u{1F60D}",
  "\u{1F929}",
  "\u{1F618}",
  "\u{1F617}",
  "\u2764",
  "\u{1F49C}",
  "\u{1F44D}",
  "\u{1F44E}",
  "\u2705",
  "\u274C",
  "\u{1F4DA}",
  "\u{1F4E2}",
  "\u{1F4E1}",
  "\u{1F514}",
  "\u{1F4A1}",
  "\u2728"
];
function EmojiPopoverContent({ onClose }) {
  const { editor } = useTiptap();
  if (!editor) return null;
  return /* @__PURE__ */ jsx19("div", { className: "grid grid-cols-6 gap-1 p-1 max-h-[12rem] overflow-auto", children: COMMON_EMOJIS.map((emoji, i) => /* @__PURE__ */ jsx19(
    "button",
    {
      type: "button",
      className: "h-8 w-8 rounded text-lg hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      onClick: () => {
        editor.chain().focus().insertContent(emoji).run();
        onClose();
      },
      "aria-label": `Insert ${emoji}`,
      children: emoji
    },
    i
  )) });
}
__name(EmojiPopoverContent, "EmojiPopoverContent");
function RichTextToolbar({
  showAttach,
  showEmoji,
  onAttachClick,
  onEmojiClick,
  emojiPopoverOpen,
  onEmojiPopoverOpenChange
}) {
  const { editor } = useTiptap();
  if (!editor) return null;
  const btn = /* @__PURE__ */ __name((name, label) => (onClick) => /* @__PURE__ */ jsxs11(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        editor.isActive(name) && "text-foreground"
      ),
      "aria-pressed": editor.isActive(name),
      "aria-label": label,
      children: [
        name === "bold" && /* @__PURE__ */ jsx19(Bold, { className: "size-3" }),
        name === "italic" && /* @__PURE__ */ jsx19(Italic, { className: "size-3" }),
        name === "strike" && /* @__PURE__ */ jsx19(Strikethrough, { className: "size-3" }),
        name === "code" && /* @__PURE__ */ jsx19(Code, { className: "size-3" })
      ]
    }
  ), "btn");
  const setLink = /* @__PURE__ */ __name(() => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url2 = window.prompt("URL:", "https://");
    if (url2) editor.chain().focus().setLink({ href: url2 }).run();
  }, "setLink");
  return /* @__PURE__ */ jsxs11("div", { className: "flex items-center gap-0 flex-wrap", children: [
    btn("bold", "Bold")(() => editor.chain().focus().toggleBold().run()),
    btn("italic", "Italic")(() => editor.chain().focus().toggleItalic().run()),
    btn("strike", "Strikethrough")(() => editor.chain().focus().toggleStrike().run()),
    btn("code", "Code")(() => editor.chain().focus().toggleCode().run()),
    /* @__PURE__ */ jsx19("span", { className: "w-px h-3.5 bg-border mx-0.5", "aria-hidden": true }),
    /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        onClick: setLink,
        className: cn(
          "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          editor.isActive("link") && "text-foreground"
        ),
        "aria-pressed": editor.isActive("link"),
        "aria-label": "Link",
        children: /* @__PURE__ */ jsx19(LinkIcon, { className: "size-3" })
      }
    ),
    /* @__PURE__ */ jsx19("span", { className: "w-px h-3.5 bg-border mx-0.5", "aria-hidden": true }),
    /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        className: cn(
          "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          editor.isActive("bulletList") && "text-foreground"
        ),
        "aria-pressed": editor.isActive("bulletList"),
        "aria-label": "Bullet list",
        children: /* @__PURE__ */ jsx19(List, { className: "size-3" })
      }
    ),
    /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        className: cn(
          "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          editor.isActive("orderedList") && "text-foreground"
        ),
        "aria-pressed": editor.isActive("orderedList"),
        "aria-label": "Numbered list",
        children: /* @__PURE__ */ jsx19(ListOrdered, { className: "size-3" })
      }
    ),
    showEmoji && /* @__PURE__ */ jsxs11(Fragment2, { children: [
      /* @__PURE__ */ jsx19("span", { className: "w-px h-3.5 bg-border mx-0.5", "aria-hidden": true }),
      onEmojiClick ? /* @__PURE__ */ jsx19(
        "button",
        {
          type: "button",
          onClick: onEmojiClick,
          className: "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "aria-label": "Insert emoji",
          children: /* @__PURE__ */ jsx19(Smile, { className: "size-3" })
        }
      ) : onEmojiPopoverOpenChange != null ? /* @__PURE__ */ jsxs11(Popover, { open: emojiPopoverOpen, onOpenChange: onEmojiPopoverOpenChange, children: [
        /* @__PURE__ */ jsx19(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx19(
          "button",
          {
            type: "button",
            className: "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "aria-label": "Insert emoji",
            children: /* @__PURE__ */ jsx19(Smile, { className: "size-3" })
          }
        ) }),
        /* @__PURE__ */ jsx19(PopoverContent, { side: "top", className: "w-auto p-0", children: /* @__PURE__ */ jsx19(EmojiPopoverContent, { onClose: () => onEmojiPopoverOpenChange(false) }) })
      ] }) : /* @__PURE__ */ jsx19(
        "button",
        {
          type: "button",
          className: "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "aria-label": "Insert emoji",
          children: /* @__PURE__ */ jsx19(Smile, { className: "size-3" })
        }
      )
    ] }),
    showAttach && /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        onClick: onAttachClick,
        className: "inline-flex items-center justify-center h-6 w-6 rounded text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "aria-label": "Attach file",
        children: /* @__PURE__ */ jsx19(Paperclip, { className: "size-3" })
      }
    )
  ] });
}
__name(RichTextToolbar, "RichTextToolbar");
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
__name(readFileAsDataUrl, "readFileAsDataUrl");
function RichTextEditor({
  placeholder = "Type your message here\u2026",
  defaultValue,
  value,
  onChange,
  disabled = false,
  size = "md",
  showAttach = true,
  showEmoji = true,
  onAttachClick: onAttachClickProp,
  onEmojiClick: onEmojiClickProp,
  onAttachFiles,
  className,
  editorClassName
}) {
  const [emojiPopoverOpen, setEmojiPopoverOpen] = React11.useState(false);
  const fileInputRef = React11.useRef(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Link.configure({ openOnClick: false }),
      Image2.configure({ allowBase64: true })
    ],
    content: value ?? defaultValue ?? "",
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: /* @__PURE__ */ __name(({ editor: e }) => {
      onChange?.(e.getHTML());
    }, "onUpdate"),
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm max-w-none w-full text-sm text-foreground leading-5 focus:outline-none",
          "px-3 pt-2 pb-1",
          richTextSizeClasses[size],
          editorClassName
        )
      }
    }
  });
  const handleAttachClick = React11.useCallback(() => {
    if (onAttachClickProp) {
      onAttachClickProp();
      return;
    }
    fileInputRef.current?.click();
  }, [onAttachClickProp]);
  const handleFileChange = React11.useCallback(
    (e) => {
      const files = e.target.files;
      if (!files?.length) return;
      const fileList = Array.from(files);
      if (onAttachFiles) {
        onAttachFiles(fileList);
      } else if (editor) {
        const file = fileList[0];
        if (file.type.startsWith("image/")) {
          readFileAsDataUrl(file).then((src) => {
            editor.chain().focus().setImage({ src }).run();
          });
        }
      }
      e.target.value = "";
    },
    [editor, onAttachFiles]
  );
  const handleEmojiClick = React11.useCallback(() => {
    if (onEmojiClickProp) {
      onEmojiClickProp();
      return;
    }
    setEmojiPopoverOpen(true);
  }, [onEmojiClickProp]);
  const showDefaultEmojiPopover = !onEmojiClickProp;
  if (!editor) return null;
  const wrapperClass = cn(
    "mindtris-rich-text-editor rounded-lg border border-input bg-field shadow-none",
    "hover:border-border/80 focus-within:outline-none focus-within:ring-0 focus-within:border-foreground/40",
    disabled && "bg-muted opacity-70 pointer-events-none",
    className
  );
  return /* @__PURE__ */ jsxs11(Fragment2, { children: [
    /* @__PURE__ */ jsx19("style", { children: `
        .mindtris-rich-text-editor .ProseMirror { outline: none; cursor: text; }
        .mindtris-rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          color: var(--muted-foreground);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .mindtris-rich-text-editor .ProseMirror ul,
        .mindtris-rich-text-editor .ProseMirror ol { padding-left: 1.5rem; }
        .mindtris-rich-text-editor .ProseMirror img { max-width: 100%; height: auto; }
      ` }),
    /* @__PURE__ */ jsx19(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        className: "hidden",
        "aria-hidden": true,
        onChange: handleFileChange
      }
    ),
    /* @__PURE__ */ jsx19("div", { className: wrapperClass, children: /* @__PURE__ */ jsx19(Tiptap, { instance: editor, children: /* @__PURE__ */ jsxs11("div", { className: "min-h-[6rem] flex flex-col", children: [
      /* @__PURE__ */ jsx19("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsx19(Tiptap.Content, {}) }),
      /* @__PURE__ */ jsx19("div", { className: "px-2 py-1.5 flex items-center", children: /* @__PURE__ */ jsx19(
        RichTextToolbar,
        {
          showAttach,
          showEmoji,
          onAttachClick: handleAttachClick,
          onEmojiClick: showDefaultEmojiPopover ? void 0 : handleEmojiClick,
          emojiPopoverOpen: showDefaultEmojiPopover ? emojiPopoverOpen : void 0,
          onEmojiPopoverOpenChange: showDefaultEmojiPopover ? setEmojiPopoverOpen : void 0
        }
      ) })
    ] }) }) })
  ] });
}
__name(RichTextEditor, "RichTextEditor");

// components/ui/input-group.tsx
import { jsx as jsx20 } from "react/jsx-runtime";
var InputGroupLayoutContext = React12.createContext("inline");
var InputGroup = React12.forwardRef(
  ({ className, children, ...props }, ref) => {
    const childArray = React12.Children.toArray(children);
    const hasBlockAddon = childArray.some(
      (c) => React12.isValidElement(c) && (c.props?.align === "block-start" || c.props?.align === "block-end")
    );
    const layout = hasBlockAddon ? "block" : "inline";
    return /* @__PURE__ */ jsx20(InputGroupLayoutContext.Provider, { value: layout, children: /* @__PURE__ */ jsx20(
      "div",
      {
        ref,
        "data-slot": "input-group",
        "data-layout": layout,
        className: cn(
          "w-full rounded-lg border border-input bg-field",
          "hover:border-border/80 focus-within:border-foreground/40 focus-within:outline-none focus-within:ring-0",
          layout === "inline" && "flex min-h-10 items-center px-3 gap-0",
          // Block layout: header/footer bars + control area inside a single shell.
          layout === "block" && "flex flex-col overflow-visible",
          className
        ),
        ...props,
        children
      }
    ) });
  }
);
InputGroup.displayName = "InputGroup";
var InputGroupAddon = React12.forwardRef(
  ({ className, align = "inline-start", ...props }, ref) => {
    const alignClasses = {
      "inline-start": "order-first shrink-0 mr-2",
      "inline-end": "order-last shrink-0 ml-2",
      "block-start": "order-first w-full min-w-0 bg-transparent px-3 py-1.5 text-left justify-start",
      "block-end": "order-last w-full min-w-0 bg-transparent px-3 pt-1.5 pb-1.5 text-left justify-start"
    };
    return /* @__PURE__ */ jsx20(
      "div",
      {
        ref,
        "data-slot": "input-group-addon",
        "data-align": align,
        className: cn(
          "flex items-center text-muted-foreground [&_svg]:shrink-0",
          (align === "inline-start" || align === "inline-end") && "justify-center",
          alignClasses[align],
          className
        ),
        ...props
      }
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";
var InputGroupInput = React12.forwardRef(
  ({ className, "data-slot": dataSlot, ...props }, ref) => /* @__PURE__ */ jsx20(InputGroupLayoutContext.Consumer, { children: (layout) => /* @__PURE__ */ jsx20(
    Input,
    {
      ref,
      "data-slot": dataSlot ?? "input-group-control",
      className: cn(
        "w-full min-w-0",
        "text-left",
        layout === "inline" && "flex-1 border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-0",
        // Block layout: control area gets standard input padding.
        layout === "block" && "border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-3 py-2",
        className
      ),
      ...props
    }
  ) })
);
InputGroupInput.displayName = "InputGroupInput";
var InputGroupTextarea = React12.forwardRef(
  ({ className, "data-slot": dataSlot, ...props }, ref) => /* @__PURE__ */ jsx20(InputGroupLayoutContext.Consumer, { children: (layout) => /* @__PURE__ */ jsx20(
    Textarea,
    {
      ref,
      "data-slot": dataSlot ?? "input-group-control",
      className: cn(
        "w-full min-w-0",
        "text-left",
        layout === "inline" && "border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-0",
        layout === "block" && "border-0 bg-transparent shadow-none hover:border-0 focus-visible:border-0 rounded-none px-3 py-2 resize-y",
        className
      ),
      ...props
    }
  ) })
);
InputGroupTextarea.displayName = "InputGroupTextarea";

// components/ui/switch.tsx
import * as React13 from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { jsx as jsx21 } from "react/jsx-runtime";
var switchRootVariants = createVariants({
  base: [
    "group relative inline-flex shrink-0 items-center rounded-full overflow-hidden outline-none transition-colors",
    "border border-transparent",
    "bg-muted data-[state=checked]:bg-primary",
    "hover:data-[state=unchecked]:bg-border",
    "focus-visible:ring-0 focus-visible:border-foreground/40",
    "data-[state=checked]:border-transparent",
    "disabled:pointer-events-none disabled:opacity-70 disabled:border-transparent disabled:data-[state=unchecked]:bg-muted",
    "aria-invalid:data-[state=unchecked]:bg-destructive/10"
  ].join(" "),
  variants: {
    size: {
      sm: "h-4 w-7",
      md: "h-5 w-9",
      lg: "h-6 w-12"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var thumbSizeMap = {
  sm: "size-3 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-[14px]",
  md: "size-4 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-[18px]",
  lg: "size-5 data-[state=unchecked]:translate-x-1 data-[state=checked]:translate-x-[26px]"
};
var Switch = React13.forwardRef(({ className, size = "md", ...props }, ref) => /* @__PURE__ */ jsx21(
  SwitchPrimitive.Root,
  {
    ref,
    "data-slot": "switch",
    "data-size": size,
    className: cn(switchRootVariants({ size }), className),
    ...props,
    children: /* @__PURE__ */ jsx21(
      SwitchPrimitive.Thumb,
      {
        "data-slot": "switch-thumb",
        className: cn(
          "pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform group-data-[state=unchecked]:ring-1 group-data-[state=unchecked]:ring-border/80 group-data-[state=unchecked]:ring-inset",
          thumbSizeMap[size]
        )
      }
    )
  }
));
Switch.displayName = "Switch";

// components/ui/checkbox.tsx
import * as React14 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { jsx as jsx22, jsxs as jsxs12 } from "react/jsx-runtime";
var Checkbox = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx22(
  CheckboxPrimitive.Root,
  {
    ref,
    "data-slot": "checkbox",
    className: cn(
      "group peer h-4 w-4 shrink-0 rounded border border-input bg-field outline-none",
      "hover:border-border/80",
      "focus-visible:ring-0 focus-visible:border-foreground/40",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      "disabled:pointer-events-none disabled:opacity-50",
      "transition-colors",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxs12(
      CheckboxPrimitive.Indicator,
      {
        "data-slot": "checkbox-indicator",
        className: "flex items-center justify-center text-current",
        children: [
          /* @__PURE__ */ jsx22(Check, { className: "h-3 w-3 group-data-[state=indeterminate]:hidden", strokeWidth: 2.5 }),
          /* @__PURE__ */ jsx22(Minus, { className: "h-3 w-3 group-data-[state=checked]:hidden", strokeWidth: 2.5 })
        ]
      }
    )
  }
));
Checkbox.displayName = "Checkbox";

// components/ui/radio-group.tsx
import * as React15 from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { jsx as jsx23 } from "react/jsx-runtime";
var radioGroupItemVariants = createVariants({
  base: [
    "relative aspect-square shrink-0 rounded-full border-2 border-input bg-field outline-none",
    "hover:border-border/80",
    "focus-visible:ring-0 focus-visible:border-foreground/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=checked]:border-primary data-[state=checked]:text-primary",
    "aria-invalid:border-destructive",
    "data-[state=checked]:aria-invalid:border-destructive data-[state=checked]:aria-invalid:text-destructive",
    "transition-colors"
  ].join(" "),
  variants: {
    size: {
      sm: "size-3",
      md: "size-4",
      lg: "size-5"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var dotSizeMap = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3"
};
var RadioGroup = React15.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  RadioGroupPrimitive.Root,
  {
    ref,
    "data-slot": "radio-group",
    className: cn("grid gap-3", className),
    ...props
  }
));
RadioGroup.displayName = "RadioGroup";
var RadioGroupItem = React15.forwardRef(({ className, size = "md", ...props }, ref) => /* @__PURE__ */ jsx23(
  RadioGroupPrimitive.Item,
  {
    ref,
    "data-slot": "radio-group-item",
    "data-size": size,
    className: cn(radioGroupItemVariants({ size }), className),
    ...props,
    children: /* @__PURE__ */ jsx23(
      RadioGroupPrimitive.Indicator,
      {
        "data-slot": "radio-group-indicator",
        className: "absolute inset-0 flex items-center justify-center",
        children: /* @__PURE__ */ jsx23(
          Circle,
          {
            className: cn("fill-current", dotSizeMap[size]),
            strokeWidth: 0
          }
        )
      }
    )
  }
));
RadioGroupItem.displayName = "RadioGroupItem";

// components/ui/chip.tsx
import * as React16 from "react";
import { X } from "lucide-react";
import { jsx as jsx24, jsxs as jsxs13 } from "react/jsx-runtime";
var chipSelectedVariants = createVariants({
  base: "border transition-colors",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground border-transparent",
      secondary: "bg-secondary text-secondary-foreground border-border",
      tertiary: "bg-card border border-border text-primary",
      accent: "bg-accent text-accent-foreground border-transparent",
      muted: "bg-muted text-muted-foreground border-border",
      outline: "bg-transparent border border-border text-foreground",
      ghost: "bg-muted text-foreground border-transparent",
      destructive: "bg-destructive text-destructive-foreground border-transparent",
      inverse: "bg-foreground text-background border-transparent"
    }
  },
  defaultVariants: { variant: "primary" }
});
var chipUnselectedClass = "bg-transparent border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors";
function Chip({
  size = "md",
  variant = "primary",
  leadingIcon,
  onRemove,
  defaultSelected = false,
  selected,
  onSelectedChange,
  className,
  disabled,
  children,
  onClick,
  ...props
}) {
  const isControlled = typeof selected === "boolean";
  const [uncontrolledSelected, setUncontrolledSelected] = React16.useState(defaultSelected);
  const isSelected = isControlled ? selected : uncontrolledSelected;
  const toggle = React16.useCallback(() => {
    const next = !isSelected;
    if (!isControlled) setUncontrolledSelected(next);
    onSelectedChange?.(next);
  }, [isControlled, isSelected, onSelectedChange]);
  const sizeClass = size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm";
  const base = "inline-flex items-center gap-1.5 rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed";
  const effectiveVariant = variant === "default" ? "primary" : variant;
  const variantClass = isSelected ? chipSelectedVariants({ variant: effectiveVariant }) : chipUnselectedClass;
  return /* @__PURE__ */ jsxs13(
    "button",
    {
      type: "button",
      "aria-pressed": isSelected,
      disabled,
      className: cn(base, sizeClass, variantClass, className),
      onClick: (e) => {
        toggle();
        onClick?.(e);
      },
      ...props,
      children: [
        leadingIcon ? /* @__PURE__ */ jsx24("span", { className: "shrink-0", children: leadingIcon }) : null,
        /* @__PURE__ */ jsx24("span", { className: "truncate", children }),
        onRemove ? /* @__PURE__ */ jsx24("span", { className: "ml-1 inline-flex", children: /* @__PURE__ */ jsx24(
          "span",
          {
            role: "button",
            tabIndex: disabled ? -1 : 0,
            "aria-label": "Remove",
            className: cn(
              "inline-flex items-center justify-center rounded-full border border-transparent",
              "text-current/80 hover:text-current",
              size === "sm" ? "h-5 w-5" : "h-5 w-5"
            ),
            onClick: (e) => {
              e.stopPropagation();
              if (disabled) return;
              onRemove();
            },
            onKeyDown: (e) => {
              if (disabled) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }
            },
            children: /* @__PURE__ */ jsx24(X, { className: "h-3.5 w-3.5", "aria-hidden": true })
          }
        ) }) : null
      ]
    }
  );
}
__name(Chip, "Chip");

// components/ui/select.tsx
import React17 from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
var Select = React17.forwardRef(
  ({ className, children, ...props }, ref) => {
    return /* @__PURE__ */ jsx25(
      "select",
      {
        ref,
        className: cn(
          "flex h-10 w-full rounded-lg border border-input bg-field px-3 py-2 text-sm shadow-none transition-colors",
          "hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props,
        children
      }
    );
  }
);
Select.displayName = "Select";

// components/ui/native-select.tsx
import * as React18 from "react";
import { ChevronDown as ChevronDown3 } from "lucide-react";
import { jsx as jsx26, jsxs as jsxs14 } from "react/jsx-runtime";
var sizeClasses3 = {
  sm: "h-8 text-xs px-2.5",
  default: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4"
};
var NativeSelect = React18.forwardRef(
  ({
    className,
    size = "default",
    invalid = false,
    fullWidth = true,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs14("div", { className: cn("relative inline-flex", fullWidth && "w-full"), children: [
      /* @__PURE__ */ jsx26(
        "select",
        {
          ref,
          "data-slot": "native-select",
          "data-invalid": invalid ? "true" : void 0,
          "data-size": size,
          className: cn(
            "flex w-full appearance-none rounded-lg border bg-field pr-9 shadow-none transition-colors",
            sizeClasses3[size],
            "border-input text-foreground",
            "hover:border-border/80",
            "focus:outline-none focus:ring-0 focus:border-foreground/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "invalid:border-destructive invalid:focus:border-destructive",
            invalid && "border-destructive focus:border-destructive",
            className
          ),
          "aria-invalid": invalid,
          ...props,
          children
        }
      ),
      /* @__PURE__ */ jsx26(
        ChevronDown3,
        {
          className: "pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
          "aria-hidden": true
        }
      )
    ] });
  }
);
NativeSelect.displayName = "NativeSelect";

// components/ui/field.tsx
import * as React20 from "react";

// components/ui/label.tsx
import * as React19 from "react";
import { jsx as jsx27 } from "react/jsx-runtime";
var Label = React19.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx27(
      "label",
      {
        ref,
        "data-slot": "label",
        className: cn(
          "flex items-center gap-2 text-sm font-medium leading-none text-foreground select-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
          className
        ),
        ...props
      }
    );
  }
);
Label.displayName = "Label";

// components/ui/field.tsx
import { jsx as jsx28, jsxs as jsxs15 } from "react/jsx-runtime";
function Field({
  label,
  htmlFor,
  required: required2,
  description,
  error,
  invalid,
  hint,
  children,
  className,
  id: idProp,
  ...props
}) {
  const generatedId = React20.useId();
  const fieldId = idProp ?? generatedId;
  return /* @__PURE__ */ jsxs15(
    "div",
    {
      "data-slot": "field",
      "data-invalid": invalid || !!error ? "true" : void 0,
      className: cn("grid gap-2", className),
      ...props,
      children: [
        label ? /* @__PURE__ */ jsxs15(Label, { htmlFor: htmlFor ?? fieldId, className: "text-sm font-medium text-foreground", children: [
          label,
          required2 ? /* @__PURE__ */ jsx28("span", { className: "ml-0.5 text-destructive", "aria-hidden": true, children: "*" }) : null
        ] }) : null,
        children ? /* @__PURE__ */ jsx28("div", { "data-slot": "field-control", className: "min-w-0", children: React20.isValidElement(children) ? React20.cloneElement(children, {
          id: children.props.id ?? fieldId,
          ...(invalid || error) && { "aria-invalid": true },
          ...(error || description) && {
            "aria-describedby": error ? `${fieldId}-error` : `${fieldId}-description`
          }
        }) : children }) : null,
        description && !error ? /* @__PURE__ */ jsx28(
          "p",
          {
            "data-slot": "field-description",
            id: `${fieldId}-description`,
            className: "text-sm text-muted-foreground",
            children: description
          }
        ) : null,
        error ? /* @__PURE__ */ jsx28(
          "p",
          {
            "data-slot": "field-error",
            id: `${fieldId}-error`,
            className: "text-sm text-destructive",
            role: "alert",
            children: error
          }
        ) : null,
        hint && !error ? /* @__PURE__ */ jsx28("p", { "data-slot": "field-hint", className: "text-xs text-muted-foreground", children: hint }) : null
      ]
    }
  );
}
__name(Field, "Field");

// components/ui/empty.tsx
import { jsx as jsx29, jsxs as jsxs16 } from "react/jsx-runtime";
var sizeClasses4 = {
  sm: "py-8 gap-3",
  default: "py-12 gap-4",
  lg: "py-16 gap-5"
};
function Empty({
  icon,
  title,
  description,
  action,
  size = "default",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs16(
    "div",
    {
      "data-slot": "empty",
      role: "status",
      "aria-label": typeof title === "string" ? title : void 0,
      className: cn(
        "flex flex-col items-center justify-center text-center",
        sizeClasses4[size],
        className
      ),
      ...props,
      children: [
        icon ? /* @__PURE__ */ jsx29(
          "div",
          {
            "data-slot": "empty-icon",
            className: "flex items-center justify-center text-muted-foreground [&>svg]:size-10 sm:[&>svg]:size-12",
            children: icon
          }
        ) : null,
        title ? /* @__PURE__ */ jsx29("h3", { "data-slot": "empty-title", className: "text-base font-semibold text-foreground sm:text-lg", children: title }) : null,
        description ? /* @__PURE__ */ jsx29("p", { "data-slot": "empty-description", className: "max-w-sm text-sm text-muted-foreground", children: description }) : null,
        action ? /* @__PURE__ */ jsx29("div", { "data-slot": "empty-action", children: action }) : null,
        children
      ]
    }
  );
}
__name(Empty, "Empty");

// components/ui/carousel.tsx
import * as React21 from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight4 } from "lucide-react";
import { jsx as jsx30 } from "react/jsx-runtime";
var CarouselContext = React21.createContext(null);
function useCarousel() {
  const context = React21.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
__name(useCarousel, "useCarousel");
var Carousel = React21.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React21.useState(false);
    const [canScrollNext, setCanScrollNext] = React21.useState(false);
    const scrollPrev = React21.useCallback(() => {
      api?.scrollPrev();
    }, [api]);
    const scrollNext = React21.useCallback(() => {
      api?.scrollNext();
    }, [api]);
    const onSelect = React21.useCallback((api2) => {
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    React21.useEffect(() => {
      if (!api) return;
      setApi?.(api);
      onSelect(api);
      api.on("reInit", onSelect).on("select", onSelect);
    }, [api, onSelect, setApi]);
    return /* @__PURE__ */ jsx30(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api: api ?? null,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          orientation
        },
        children: /* @__PURE__ */ jsx30(
          "div",
          {
            ref,
            "data-slot": "carousel",
            className: cn("relative", className),
            "data-orientation": orientation,
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
var CarouselContent = React21.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx30("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx30(
      "div",
      {
        ref,
        "data-slot": "carousel-content",
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
var CarouselItem = React21.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx30(
      "div",
      {
        ref,
        "data-slot": "carousel-item",
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsx30(
    Button,
    {
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      "aria-label": "Previous slide",
      ...props,
      children: /* @__PURE__ */ jsx30(ChevronLeft2, { className: "h-4 w-4" })
    }
  );
}
__name(CarouselPrevious, "CarouselPrevious");
CarouselPrevious.displayName = "CarouselPrevious";
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsx30(
    Button,
    {
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      "aria-label": "Next slide",
      ...props,
      children: /* @__PURE__ */ jsx30(ChevronRight4, { className: "h-4 w-4" })
    }
  );
}
__name(CarouselNext, "CarouselNext");
CarouselNext.displayName = "CarouselNext";

// components/ui/combobox.tsx
import * as React24 from "react";
import { Check as Check2, ChevronsUpDown } from "lucide-react";

// components/ui/command.tsx
import * as React23 from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

// components/ui/dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X as X3 } from "lucide-react";

// components/ui/separator.tsx
import * as React22 from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx31 } from "react/jsx-runtime";
var Separator2 = React22.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  const orientationClasses = orientation === "vertical" ? "h-full w-px min-w-px bg-border" : "h-px min-h-px w-full bg-border";
  return /* @__PURE__ */ jsx31(
    SeparatorPrimitive.Root,
    {
      ref,
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0",
        orientationClasses,
        className
      ),
      ...props
    }
  );
});
Separator2.displayName = "Separator";

// components/ui/drawer.tsx
import { X as X2 } from "lucide-react";
import { Drawer as DrawerPrimitive } from "vaul";
import { jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
function Drawer({ ...props }) {
  return /* @__PURE__ */ jsx32(DrawerPrimitive.Root, { "data-slot": "drawer", ...props });
}
__name(Drawer, "Drawer");
function DrawerTrigger({ ...props }) {
  return /* @__PURE__ */ jsx32(DrawerPrimitive.Trigger, { "data-slot": "drawer-trigger", ...props });
}
__name(DrawerTrigger, "DrawerTrigger");
function DrawerPortal({ ...props }) {
  return /* @__PURE__ */ jsx32(DrawerPrimitive.Portal, { "data-slot": "drawer-portal", ...props });
}
__name(DrawerPortal, "DrawerPortal");
function DrawerClose({ ...props }) {
  return /* @__PURE__ */ jsx32(DrawerPrimitive.Close, { "data-slot": "drawer-close", ...props });
}
__name(DrawerClose, "DrawerClose");
function DrawerOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx32(
    DrawerPrimitive.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "fixed inset-0 z-[80]",
        "bg-foreground/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      ),
      ...props
    }
  );
}
__name(DrawerOverlay, "DrawerOverlay");
function DrawerContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs17(DrawerPortal, { children: [
    /* @__PURE__ */ jsx32(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs17(
      DrawerPrimitive.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content fixed z-[81] flex h-auto flex-col overflow-hidden",
          "border border-border bg-card text-card-foreground shadow-xl",
          // direction variants: inset like Sheet (no edge-to-edge)
          "data-[vaul-drawer-direction=top]:top-2 data-[vaul-drawer-direction=top]:left-2 data-[vaul-drawer-direction=top]:right-2 data-[vaul-drawer-direction=top]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=top]:rounded-xl",
          "data-[vaul-drawer-direction=bottom]:bottom-2 data-[vaul-drawer-direction=bottom]:left-2 data-[vaul-drawer-direction=bottom]:right-2 data-[vaul-drawer-direction=bottom]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=bottom]:min-h-[min(70vh,34rem)] data-[vaul-drawer-direction=bottom]:rounded-xl",
          "data-[vaul-drawer-direction=right]:top-2 data-[vaul-drawer-direction=right]:bottom-2 data-[vaul-drawer-direction=right]:right-2 data-[vaul-drawer-direction=right]:w-[min(94vw,32rem)] data-[vaul-drawer-direction=right]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=right]:rounded-xl",
          "data-[vaul-drawer-direction=left]:top-2 data-[vaul-drawer-direction=left]:bottom-2 data-[vaul-drawer-direction=left]:left-2 data-[vaul-drawer-direction=left]:w-[min(94vw,32rem)] data-[vaul-drawer-direction=left]:max-h-[calc(100vh-1rem)] data-[vaul-drawer-direction=left]:rounded-xl",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx32("div", { className: "mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children,
          showCloseButton ? /* @__PURE__ */ jsxs17(
            DrawerPrimitive.Close,
            {
              "data-slot": "drawer-close",
              className: cn(
                "absolute right-4 top-4 inline-flex items-center justify-center",
                "h-8 w-8 rounded-md",
                "cursor-pointer",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:cursor-not-allowed"
              ),
              children: [
                /* @__PURE__ */ jsx32(X2, { className: "h-4 w-4", "aria-hidden": true }),
                /* @__PURE__ */ jsx32("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) : null
        ]
      }
    )
  ] });
}
__name(DrawerContent, "DrawerContent");
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx32(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn(
        "flex flex-col gap-1.5 p-6 pb-4",
        "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        "md:text-left",
        className
      ),
      ...props
    }
  );
}
__name(DrawerHeader, "DrawerHeader");
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx32(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn(
        "mt-auto flex flex-col-reverse gap-2 p-6 pt-4 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
__name(DrawerFooter, "DrawerFooter");
function DrawerTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx32(
    DrawerPrimitive.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-lg font-semibold leading-none", className),
      ...props
    }
  );
}
__name(DrawerTitle, "DrawerTitle");
function DrawerDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx32(
    DrawerPrimitive.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(DrawerDescription, "DrawerDescription");

// components/ui/dialog.tsx
import { jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx33(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
__name(Dialog, "Dialog");
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx33(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
__name(DialogTrigger, "DialogTrigger");
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx33(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
__name(DialogPortal, "DialogPortal");
function DialogClose({ ...props }) {
  return /* @__PURE__ */ jsx33(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
__name(DialogClose, "DialogClose");
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx33(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 z-[80]",
        "bg-black/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      ),
      ...props
    }
  );
}
__name(DialogOverlay, "DialogOverlay");
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs18(DialogPortal, { children: [
    /* @__PURE__ */ jsx33(DialogOverlay, {}),
    /* @__PURE__ */ jsxs18(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed left-[50%] top-[50%] z-[82] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-3xl",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton ? /* @__PURE__ */ jsxs18(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: cn(
                "absolute right-4 top-4 inline-flex cursor-pointer items-center justify-center rounded-md",
                "h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none [&_svg]:pointer-events-none"
              ),
              children: [
                /* @__PURE__ */ jsx33(X3, { className: "h-4 w-4", "aria-hidden": true }),
                /* @__PURE__ */ jsx33("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) : null
        ]
      }
    )
  ] });
}
__name(DialogContent, "DialogContent");
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx33(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-1.5 text-center sm:text-left", className),
      ...props
    }
  );
}
__name(DialogHeader, "DialogHeader");
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx33(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
__name(DialogFooter, "DialogFooter");
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx33(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg font-semibold leading-none", className),
      ...props
    }
  );
}
__name(DialogTitle, "DialogTitle");
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx33(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(DialogDescription, "DialogDescription");
function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  desktopQuery = "(min-width: 768px)",
  drawerDirection = "bottom",
  mode,
  contentClassName,
  bodyClassName,
  headerClassName,
  footerClassName,
  hideClose = false
}) {
  const isDesktop = useMediaQuery(desktopQuery);
  const resolvedMode = mode ?? (isDesktop ? "dialog" : "drawer");
  if (resolvedMode === "dialog") {
    return /* @__PURE__ */ jsx33(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs18(DialogContent, { className: cn("p-0 overflow-hidden", contentClassName), showCloseButton: !hideClose, children: [
      title || description ? /* @__PURE__ */ jsxs18(DialogHeader, { className: cn("px-6 pt-6 pb-4", headerClassName), children: [
        title ? /* @__PURE__ */ jsx33(DialogTitle, { className: "text-base", children: title }) : null,
        description ? /* @__PURE__ */ jsx33(DialogDescription, { children: description }) : null
      ] }) : null,
      title || description ? /* @__PURE__ */ jsx33(Separator2, {}) : null,
      /* @__PURE__ */ jsx33("div", { className: cn("px-6 py-4", bodyClassName), children }),
      footer ? /* @__PURE__ */ jsx33(Separator2, {}) : null,
      footer ? /* @__PURE__ */ jsx33(DialogFooter, { className: cn("px-6 pt-4 pb-6", footerClassName), children: footer }) : null
    ] }) });
  }
  return /* @__PURE__ */ jsx33(Drawer, { open, onOpenChange, direction: drawerDirection, children: /* @__PURE__ */ jsxs18(DrawerContent, { className: cn("p-0", contentClassName), children: [
    !hideClose ? /* @__PURE__ */ jsx33("div", { className: "absolute right-4 top-4 z-10", children: /* @__PURE__ */ jsx33(DrawerClose, { asChild: true, children: /* @__PURE__ */ jsx33(Button, { variant: "icon-ghost", size: "icon-sm", "aria-label": "Close", children: /* @__PURE__ */ jsx33(X3, { className: "h-4 w-4", "aria-hidden": true }) }) }) }) : null,
    title || description ? /* @__PURE__ */ jsxs18(DrawerHeader, { className: cn("px-6 pt-6 pb-4", headerClassName), children: [
      title ? /* @__PURE__ */ jsx33(DrawerTitle, { className: "text-base", children: title }) : null,
      description ? /* @__PURE__ */ jsx33(DrawerDescription, { children: description }) : null
    ] }) : null,
    title || description ? /* @__PURE__ */ jsx33(Separator2, {}) : null,
    /* @__PURE__ */ jsx33("div", { className: cn("px-6 py-4", bodyClassName), children }),
    footer ? /* @__PURE__ */ jsx33(Separator2, {}) : null,
    footer ? /* @__PURE__ */ jsx33(DrawerFooter, { className: cn("px-6 pt-4 pb-6", footerClassName), children: footer }) : null
  ] }) });
}
__name(ResponsiveDialog, "ResponsiveDialog");

// components/ui/command.tsx
import { jsx as jsx34, jsxs as jsxs19 } from "react/jsx-runtime";
var Command = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  CommandPrimitive,
  {
    ref,
    "data-slot": "command",
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = "Command";
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  commandProps,
  className,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs19(Dialog, { ...props, children: [
    /* @__PURE__ */ jsxs19(DialogHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsx34(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx34(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx34(DialogContent, { className: cn("overflow-hidden p-0", className), showCloseButton, children: /* @__PURE__ */ jsx34(
      Command,
      {
        ...commandProps,
        className: cn(
          // Match shadcn-like internal spacing when rendered in a dialog
          "[&_[data-slot=command-input-wrapper]]:h-12 [&_[data-slot=command-input]]:h-12",
          "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
          "[&_[cmdk-group]]:px-2",
          "[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3",
          commandProps?.className
        ),
        children
      }
    ) })
  ] });
}
__name(CommandDialog, "CommandDialog");
var CommandInput = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs19(
  "div",
  {
    "data-slot": "command-input-wrapper",
    className: "flex h-9 items-center gap-2 border-b border-border bg-muted/30 px-3 rounded-t-lg",
    children: [
      /* @__PURE__ */ jsx34(Search, { className: "h-4 w-4 text-muted-foreground", "aria-hidden": true }),
      /* @__PURE__ */ jsx34(
        CommandPrimitive.Input,
        {
          ref,
          "data-slot": "command-input",
          className: cn(
            "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none",
            "placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          ...props
        }
      )
    ]
  }
));
CommandInput.displayName = "CommandInput";
var CommandList = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  CommandPrimitive.List,
  {
    ref,
    "data-slot": "command-list",
    className: cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className),
    ...props
  }
));
CommandList.displayName = "CommandList";
var CommandEmpty = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  CommandPrimitive.Empty,
  {
    ref,
    "data-slot": "command-empty",
    className: cn("py-6 text-center text-sm text-muted-foreground", className),
    ...props
  }
));
CommandEmpty.displayName = "CommandEmpty";
var CommandGroup = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  CommandPrimitive.Group,
  {
    ref,
    "data-slot": "command-group",
    className: cn(
      "overflow-hidden p-1 text-foreground",
      // heading
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = "CommandGroup";
var CommandSeparator = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  CommandPrimitive.Separator,
  {
    ref,
    "data-slot": "command-separator",
    className: cn("-mx-1 h-px min-h-0 max-h-px shrink-0 bg-border/90", className),
    ...props
  }
));
CommandSeparator.displayName = "CommandSeparator";
var CommandItem = React23.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  CommandPrimitive.Item,
  {
    ref,
    "data-slot": "command-item",
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:h-4 [&_svg:not([class*='size-'])]:w-4",
      className
    ),
    ...props
  }
));
CommandItem.displayName = "CommandItem";
function CommandShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx34(
    "span",
    {
      "data-slot": "command-shortcut",
      className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
      ...props
    }
  );
}
__name(CommandShortcut, "CommandShortcut");

// components/ui/combobox.tsx
import { jsx as jsx35, jsxs as jsxs20 } from "react/jsx-runtime";
function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  disabled = false,
  clearable = false,
  clearLabel = "Clear",
  triggerClassName,
  contentClassName,
  fullWidth = false
}) {
  const [open, setOpen] = React24.useState(false);
  const selected = options.find((o) => o.value === value);
  const handleSelect = React24.useCallback(
    (currentValue) => {
      const isClear = clearable && (currentValue === "__clear__" || currentValue === clearLabel);
      const next = isClear ? void 0 : currentValue;
      onChange?.(next);
      setOpen(false);
    },
    [clearable, clearLabel, onChange]
  );
  return /* @__PURE__ */ jsxs20(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx35(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs20(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        "aria-label": selected?.label ?? placeholder,
        disabled,
        className: cn(
          "justify-between font-normal",
          fullWidth && "w-full",
          !value && "text-muted-foreground",
          value && "border-foreground",
          triggerClassName
        ),
        children: [
          /* @__PURE__ */ jsx35("span", { className: "truncate", children: selected?.label ?? placeholder }),
          /* @__PURE__ */ jsx35(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx35(
      PopoverContent,
      {
        className: cn("w-[--radix-popover-trigger-width] p-0", contentClassName),
        align: "start",
        children: /* @__PURE__ */ jsxs20(Command, { children: [
          /* @__PURE__ */ jsx35(CommandInput, { placeholder: searchPlaceholder }),
          /* @__PURE__ */ jsxs20(CommandList, { children: [
            /* @__PURE__ */ jsx35(CommandEmpty, { children: emptyMessage }),
            /* @__PURE__ */ jsxs20(CommandGroup, { children: [
              clearable && value ? /* @__PURE__ */ jsxs20(CommandItem, { value: "__clear__", onSelect: () => handleSelect("__clear__"), children: [
                /* @__PURE__ */ jsx35("span", { className: "mr-2 h-4 w-4 shrink-0", "aria-hidden": true }),
                clearLabel
              ] }) : null,
              options.map((opt) => /* @__PURE__ */ jsxs20(
                CommandItem,
                {
                  value: opt.label,
                  disabled: opt.disabled,
                  onSelect: () => handleSelect(opt.value),
                  children: [
                    /* @__PURE__ */ jsx35(
                      Check2,
                      {
                        className: cn(
                          "mr-2 h-4 w-4",
                          value === opt.value ? "opacity-100" : "opacity-0"
                        )
                      }
                    ),
                    opt.label
                  ]
                },
                opt.value
              ))
            ] })
          ] })
        ] })
      }
    )
  ] });
}
__name(Combobox, "Combobox");

// components/ui/menubar.tsx
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check as Check3, ChevronRight as ChevronRight5 } from "lucide-react";
import { jsx as jsx36, jsxs as jsxs21 } from "react/jsx-runtime";
var Menubar = MenubarPrimitive.Root;
var MenubarMenu = MenubarPrimitive.Menu;
var MenubarTrigger = MenubarPrimitive.Trigger;
var MenubarGroup = MenubarPrimitive.Group;
var MenubarPortal = MenubarPrimitive.Portal;
var MenubarRadioGroup = MenubarPrimitive.RadioGroup;
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return /* @__PURE__ */ jsx36(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx36(
    MenubarPrimitive.Content,
    {
      "data-slot": "menubar-content",
      align,
      alignOffset,
      sideOffset,
      className: cn(
        "z-[9999] min-w-[12rem] overflow-hidden rounded-lg border border-input bg-card p-1 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) });
}
__name(MenubarContent, "MenubarContent");
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    MenubarPrimitive.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "data-[variant=default]:focus:bg-accent data-[variant=default]:focus:text-accent-foreground",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10",
        "data-[variant=destructive]:focus:text-destructive",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        "data-[variant=destructive]:[&_svg]:text-destructive",
        className
      ),
      ...props
    }
  );
}
__name(MenubarItem, "MenubarItem");
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
    MenubarPrimitive.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx36("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx36(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx36(Check3, { className: "h-4 w-4" }) }) }),
        children
      ]
    }
  );
}
__name(MenubarCheckboxItem, "MenubarCheckboxItem");
function MenubarRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
    MenubarPrimitive.RadioItem,
    {
      "data-slot": "menubar-radio-item",
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx36("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx36(MenubarPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx36("span", { className: "h-2 w-2 rounded-full bg-current" }) }) }),
        children
      ]
    }
  );
}
__name(MenubarRadioItem, "MenubarRadioItem");
function MenubarLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    MenubarPrimitive.Label,
    {
      "data-slot": "menubar-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        "data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
__name(MenubarLabel, "MenubarLabel");
function MenubarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    MenubarPrimitive.Separator,
    {
      "data-slot": "menubar-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
__name(MenubarSeparator, "MenubarSeparator");
function MenubarShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
      ...props
    }
  );
}
__name(MenubarShortcut, "MenubarShortcut");
function MenubarSub({
  ...props
}) {
  return /* @__PURE__ */ jsx36(MenubarPrimitive.Sub, { "data-slot": "menubar-sub", ...props });
}
__name(MenubarSub, "MenubarSub");
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(
    MenubarPrimitive.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx36(ChevronRight5, { className: "ml-auto h-4 w-4" })
      ]
    }
  );
}
__name(MenubarSubTrigger, "MenubarSubTrigger");
function MenubarSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx36(
    MenubarPrimitive.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: cn(
        "z-[9999] min-w-[8rem] overflow-hidden rounded-lg border border-input bg-card p-1 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  );
}
__name(MenubarSubContent, "MenubarSubContent");

// components/ui/context-menu.tsx
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check as Check4, ChevronRight as ChevronRight6 } from "lucide-react";
import { jsx as jsx37, jsxs as jsxs22 } from "react/jsx-runtime";
var ContextMenu = ContextMenuPrimitive.Root;
var ContextMenuTrigger = ContextMenuPrimitive.Trigger;
var ContextMenuGroup = ContextMenuPrimitive.Group;
var ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
var ContextMenuPortal = ContextMenuPrimitive.Portal;
function ContextMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx37(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx37(
    ContextMenuPrimitive.Content,
    {
      "data-slot": "context-menu-content",
      className: cn(
        "z-[9999] min-w-[8rem] overflow-hidden rounded-lg border border-input bg-card p-1 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) });
}
__name(ContextMenuContent, "ContextMenuContent");
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    ContextMenuPrimitive.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "data-[variant=default]:focus:bg-accent data-[variant=default]:focus:text-accent-foreground",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10",
        "data-[variant=destructive]:focus:text-destructive",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        "data-[variant=destructive]:[&_svg]:text-destructive",
        className
      ),
      ...props
    }
  );
}
__name(ContextMenuItem, "ContextMenuItem");
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxs22(
    ContextMenuPrimitive.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx37("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx37(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx37(Check4, { className: "h-4 w-4" }) }) }),
        children
      ]
    }
  );
}
__name(ContextMenuCheckboxItem, "ContextMenuCheckboxItem");
function ContextMenuRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs22(
    ContextMenuPrimitive.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      className: cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx37("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx37(ContextMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx37("span", { className: "h-2 w-2 rounded-full bg-current" }) }) }),
        children
      ]
    }
  );
}
__name(ContextMenuRadioItem, "ContextMenuRadioItem");
function ContextMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    ContextMenuPrimitive.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        "data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
__name(ContextMenuLabel, "ContextMenuLabel");
function ContextMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    ContextMenuPrimitive.Separator,
    {
      "data-slot": "context-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
__name(ContextMenuSeparator, "ContextMenuSeparator");
function ContextMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
      ...props
    }
  );
}
__name(ContextMenuShortcut, "ContextMenuShortcut");
function ContextMenuSub({
  ...props
}) {
  return /* @__PURE__ */ jsx37(ContextMenuPrimitive.Sub, { "data-slot": "context-menu-sub", ...props });
}
__name(ContextMenuSub, "ContextMenuSub");
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs22(
    ContextMenuPrimitive.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx37(ChevronRight6, { className: "ml-auto h-4 w-4" })
      ]
    }
  );
}
__name(ContextMenuSubTrigger, "ContextMenuSubTrigger");
function ContextMenuSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx37(
    ContextMenuPrimitive.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: cn(
        "z-[9999] min-w-[8rem] overflow-hidden rounded-lg border border-input bg-card p-1 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  );
}
__name(ContextMenuSubContent, "ContextMenuSubContent");

// components/ui/dropdown.tsx
import * as React25 from "react";
import Image3 from "next/image";
import { Check as Check5, CircleCheck, ChevronDown as ChevronDown4, X as X4 } from "lucide-react";
import { Menu as Menu2, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Fragment as Fragment3, jsx as jsx38, jsxs as jsxs23 } from "react/jsx-runtime";
function DropdownSelect({
  value,
  options,
  onChange,
  ariaLabel = "Select option",
  buttonLeadingIcon,
  align = "start",
  fullWidth = false,
  optionVariant = "checkmark",
  selectedCount = 0,
  filterLabel,
  labelOptionValue,
  searchable = false,
  searchPlaceholder = "Filter...",
  className
}) {
  const selected = options.find((o) => o.value === value) ?? options[0];
  const isActive = selectedCount > 0;
  const triggerLabel = filterLabel ?? selected?.label;
  const [searchQuery, setSearchQuery] = React25.useState("");
  const labelOpt = labelOptionValue != null ? options.find((o) => o.value === labelOptionValue) : null;
  const valOpts = labelOptionValue != null ? options.filter((o) => o.value !== labelOptionValue) : options;
  const q = searchQuery.trim().toLowerCase();
  const filtered = searchable && q ? valOpts.filter((o) => o.label.toLowerCase().includes(q)) : valOpts;
  const content = /* @__PURE__ */ jsx38("div", { className: "font-medium text-sm text-muted-foreground", children: optionVariant === "checkbox" && labelOpt ? /* @__PURE__ */ jsxs23(Fragment3, { children: [
    /* @__PURE__ */ jsxs23(
      "div",
      {
        role: "option",
        "aria-selected": value === labelOpt.value,
        tabIndex: 0,
        onClick: () => onChange(labelOpt.value),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange(labelOpt.value);
          }
        },
        className: "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left transition-colors cursor-pointer min-h-[2.25rem]",
        children: [
          /* @__PURE__ */ jsx38("span", { className: "truncate font-medium text-foreground", children: labelOpt.label }),
          /* @__PURE__ */ jsx38("button", { type: "button", "aria-label": "Clear filter", onClick: (e) => {
            e.stopPropagation();
            onChange(labelOpt.value);
          }, className: "shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer", children: /* @__PURE__ */ jsx38(X4, { className: "h-4 w-4", "aria-hidden": true }) })
        ]
      }
    ),
    searchable ? /* @__PURE__ */ jsx38("div", { className: "mb-1 px-1", children: /* @__PURE__ */ jsx38("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: searchPlaceholder, className: "h-8 w-full rounded-md border border-input bg-field px-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-foreground/40", onKeyDown: (e) => e.stopPropagation() }) }) : null,
    filtered.map((opt) => /* @__PURE__ */ jsxs23("div", { role: "option", "aria-selected": opt.value === value, tabIndex: 0, onClick: () => onChange(opt.value), onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange(opt.value);
      }
    }, className: cn("flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors cursor-pointer hover:bg-background hover:text-foreground", opt.value === value && "text-primary"), children: [
      /* @__PURE__ */ jsx38(Checkbox, { checked: opt.value === value, className: "pointer-events-none shrink-0", "aria-hidden": true }),
      /* @__PURE__ */ jsx38("span", { className: "truncate", children: opt.label })
    ] }, opt.value))
  ] }) : options.map((opt) => /* @__PURE__ */ jsxs23("button", { type: "button", onClick: () => onChange(opt.value), className: cn("flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-background hover:text-foreground", opt.value === value && "text-primary"), children: [
    /* @__PURE__ */ jsx38(CircleCheck, { className: cn("h-4 w-4 shrink-0", opt.value === value ? "text-foreground" : "invisible"), "aria-hidden": true }),
    /* @__PURE__ */ jsx38("span", { className: "truncate", children: opt.label })
  ] }, opt.value)) });
  return /* @__PURE__ */ jsxs23(Popover, { children: [
    /* @__PURE__ */ jsx38(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs23("button", { type: "button", "aria-label": ariaLabel, className: cn("inline-flex h-9 items-center gap-1.5 rounded-md border bg-transparent px-3 py-1 text-sm transition-colors text-left", isActive ? "border-foreground" : "border-input text-muted-foreground hover:text-foreground hover:bg-background", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", "data-[state=open]:ring-0 data-[state=open]:ring-offset-0", fullWidth ? "w-full min-w-0" : "min-w-0", className), children: [
      /* @__PURE__ */ jsxs23("span", { className: "flex min-w-0 shrink items-center gap-1.5 truncate", children: [
        buttonLeadingIcon ? /* @__PURE__ */ jsx38("span", { className: "shrink-0 text-muted-foreground", children: buttonLeadingIcon }) : null,
        !filterLabel && selected?.leadingIcon ? /* @__PURE__ */ jsx38("span", { className: "shrink-0", children: selected.leadingIcon }) : null,
        /* @__PURE__ */ jsx38("span", { className: cn("truncate", isActive && "text-foreground"), children: triggerLabel }),
        isActive ? /* @__PURE__ */ jsx38("span", { className: "flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background", "aria-hidden": true, children: selectedCount }) : null
      ] }),
      /* @__PURE__ */ jsx38(ChevronDown4, { className: "h-4 w-4 shrink-0 text-muted-foreground", "aria-hidden": true })
    ] }) }),
    /* @__PURE__ */ jsx38(PopoverContent, { align, sideOffset: 6, className: cn("w-[min(18rem,calc(100vw-2rem))] p-1.5", fullWidth && "w-[min(24rem,calc(100vw-2rem))]"), children: content })
  ] });
}
__name(DropdownSelect, "DropdownSelect");
function ClassicDropdown({
  value,
  options,
  onChange,
  ariaLabel = "Select option",
  buttonLeadingIcon,
  align = "end",
  fullWidth = false,
  className
}) {
  const selected = options.find((o) => o.value === value) ?? options[0];
  const triggerRef = React25.useRef(null);
  const [triggerWidth, setTriggerWidth] = React25.useState(void 0);
  React25.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [selected, options]);
  return /* @__PURE__ */ jsxs23(Popover, { children: [
    /* @__PURE__ */ jsx38(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs23(
      "button",
      {
        ref: triggerRef,
        type: "button",
        "aria-label": ariaLabel,
        className: cn(
          // Matches .btn from utility-patterns.css + mindtris-ui date-select.tsx
          "font-medium text-sm inline-flex items-center justify-between border rounded-lg leading-5 transition-colors",
          "px-3.5 py-2.5",
          fullWidth ? "w-full" : "w-auto min-w-[8rem]",
          "bg-card border-border hover:border-border/80",
          "text-muted-foreground hover:text-foreground",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs23("span", { className: "flex items-center gap-2", children: [
            buttonLeadingIcon ? /* @__PURE__ */ jsx38("span", { className: "shrink-0 text-muted-foreground", children: buttonLeadingIcon }) : null,
            selected?.leadingIcon ? /* @__PURE__ */ jsx38("span", { className: "shrink-0", children: selected.leadingIcon }) : null,
            /* @__PURE__ */ jsx38("span", { children: selected?.label })
          ] }),
          /* @__PURE__ */ jsx38(ChevronDown4, { className: "h-4 w-4 shrink-0 ml-2 text-muted-foreground", "aria-hidden": true })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx38(
      PopoverContent,
      {
        align,
        side: "bottom",
        sideOffset: 6,
        style: triggerWidth ? { width: `${triggerWidth}px`, maxWidth: "calc(100vw - 2rem)" } : void 0,
        className: cn(
          "p-2",
          fullWidth ? "w-full min-w-0" : triggerWidth ? "min-w-fit" : "min-w-fit max-w-[calc(100vw-2rem)]"
        ),
        children: /* @__PURE__ */ jsx38("div", { className: "font-medium text-sm text-muted-foreground", children: options.map((opt) => {
          const isSelected = opt.value === value;
          return /* @__PURE__ */ jsx38(
            "button",
            {
              type: "button",
              onClick: () => onChange(opt.value),
              className: cn(
                "flex w-full items-center rounded-md px-2.5 py-2 text-left transition-colors",
                "hover:bg-muted hover:text-foreground",
                isSelected && "text-primary"
              ),
              children: /* @__PURE__ */ jsx38("span", { className: "truncate", children: opt.label })
            },
            opt.value
          );
        }) })
      }
    )
  ] });
}
__name(ClassicDropdown, "ClassicDropdown");
function DropdownIconMenu({
  ariaLabel,
  icon,
  align = "right",
  children,
  className
}) {
  return /* @__PURE__ */ jsx38(Menu2, { as: "div", className: cn("relative inline-flex", className), children: ({ open }) => /* @__PURE__ */ jsxs23(Fragment3, { children: [
    /* @__PURE__ */ jsx38(
      MenuButton,
      {
        "aria-label": ariaLabel,
        className: cn(
          "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
          "hover:bg-muted",
          open && "bg-muted"
        ),
        children: icon
      }
    ),
    /* @__PURE__ */ jsx38(
      Transition,
      {
        as: "div",
        className: cn(
          "origin-top-right z-10 absolute top-full min-w-[11rem] bg-card border border-border py-1.5 rounded-lg shadow-lg overflow-hidden mt-1",
          align === "right" ? "right-0" : "left-0"
        ),
        enter: "transition ease-out duration-200 transform",
        enterFrom: "opacity-0 -translate-y-2",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition ease-out duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsx38(MenuItems, { as: "div", className: "focus:outline-none", children })
      }
    )
  ] }) });
}
__name(DropdownIconMenu, "DropdownIconMenu");
function DropdownMenuSectionLabel({ children }) {
  return /* @__PURE__ */ jsx38("div", { className: "text-xs font-semibold text-muted-foreground uppercase pt-1.5 pb-2 px-3", children });
}
__name(DropdownMenuSectionLabel, "DropdownMenuSectionLabel");
function DropdownMenuAction({
  className,
  activeClassName,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx38(MenuItem, { children: ({ active }) => /* @__PURE__ */ jsx38(
    "button",
    {
      type: "button",
      className: cn(
        "font-medium text-sm flex items-center w-full py-2 px-3 text-left transition-colors",
        active ? activeClassName ?? "bg-muted" : null,
        className
      ),
      ...props,
      children
    }
  ) });
}
__name(DropdownMenuAction, "DropdownMenuAction");
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
__name(DropdownMenu, "DropdownMenu");
function DropdownMenuPortal({ ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
__name(DropdownMenuPortal, "DropdownMenuPortal");
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
__name(DropdownMenuTrigger, "DropdownMenuTrigger");
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx38(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        // Match PopoverContent + DropdownSelect surface
        "z-[9999] min-w-[11rem] max-w-[min(28rem,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto",
        "rounded-lg bg-card p-1.5 text-foreground shadow-lg outline-hidden",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) });
}
__name(DropdownMenuContent, "DropdownMenuContent");
function DropdownMenuGroup({ ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
__name(DropdownMenuGroup, "DropdownMenuGroup");
function DropdownMenuLabel({ className, inset, ...props }) {
  return /* @__PURE__ */ jsx38(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn("px-2.5 py-2 text-xs font-semibold text-muted-foreground uppercase data-[inset]:pl-8", className),
      ...props
    }
  );
}
__name(DropdownMenuLabel, "DropdownMenuLabel");
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
  return /* @__PURE__ */ jsx38(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        // Match DropdownSelect option rows
        "flex w-full cursor-default select-none items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium outline-hidden transition-colors",
        "text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:focus:bg-destructive/10",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        "data-[variant=destructive]:[&_svg]:text-destructive",
        className
      ),
      ...props
    }
  );
}
__name(DropdownMenuItem, "DropdownMenuItem");
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
  return /* @__PURE__ */ jsxs23(
    DropdownMenuPrimitive.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-md px-2.5 py-2 pl-8 text-left text-sm font-medium outline-hidden transition-colors",
        "text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx38("span", { className: "pointer-events-none absolute left-2.5 flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx38(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx38(Check5, { className: "text-primary" }) }) }),
        children
      ]
    }
  );
}
__name(DropdownMenuCheckboxItem, "DropdownMenuCheckboxItem");
function DropdownMenuRadioGroup({ ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...props });
}
__name(DropdownMenuRadioGroup, "DropdownMenuRadioGroup");
function DropdownMenuRadioItem({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs23(
    DropdownMenuPrimitive.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-md px-2.5 py-2 pl-8 text-left text-sm font-medium outline-hidden transition-colors",
        "text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx38("span", { className: "pointer-events-none absolute left-2.5 flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx38(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx38("span", { className: "h-2 w-2 rounded-full bg-primary", "aria-hidden": true }) }) }),
        children
      ]
    }
  );
}
__name(DropdownMenuRadioItem, "DropdownMenuRadioItem");
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx38(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1.5 my-1 h-px", className),
      ...props
    }
  );
}
__name(DropdownMenuSeparator, "DropdownMenuSeparator");
function DropdownMenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx38("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
}
__name(DropdownMenuShortcut, "DropdownMenuShortcut");
function DropdownMenuSub({ ...props }) {
  return /* @__PURE__ */ jsx38(DropdownMenuPrimitive.Sub, { "data-slot": "dropdown-menu-sub", ...props });
}
__name(DropdownMenuSub, "DropdownMenuSub");
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
  return /* @__PURE__ */ jsxs23(
    DropdownMenuPrimitive.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "flex cursor-default select-none items-center rounded-md px-2.5 py-2 text-sm font-medium outline-hidden transition-colors",
        "text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground",
        "data-[inset]:pl-8",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx38("span", { className: "ml-auto text-muted-foreground", "aria-hidden": true, children: /* @__PURE__ */ jsx38(ChevronDown4, { className: "h-4 w-4 -rotate-90", "aria-hidden": true }) })
      ]
    }
  );
}
__name(DropdownMenuSubTrigger, "DropdownMenuSubTrigger");
function DropdownMenuSubContent({ className, sideOffset = 6, ...props }) {
  return /* @__PURE__ */ jsx38(
    DropdownMenuPrimitive.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      sideOffset,
      className: cn(
        "z-[9999] min-w-[11rem] overflow-hidden rounded-lg border border-border bg-card p-1.5 text-foreground shadow-lg outline-hidden",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  );
}
__name(DropdownMenuSubContent, "DropdownMenuSubContent");
var defaultProfileItems = [
  { label: "Settings", href: "/settings/account" },
  { label: "Sign Out", href: "#0" }
];
function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
__name(getInitials, "getInitials");
function DropdownProfile({
  avatarSrc,
  name = "Mindtris Inc.",
  role = "Administrator",
  items = defaultProfileItems,
  align = "right",
  className
}) {
  const initials = getInitials(name);
  return /* @__PURE__ */ jsx38(Menu2, { as: "div", className: cn("relative inline-flex", className), children: ({ open }) => /* @__PURE__ */ jsxs23(Fragment3, { children: [
    /* @__PURE__ */ jsx38(MenuButton, { className: "inline-flex justify-center items-center group cursor-pointer", children: /* @__PURE__ */ jsx38("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsx38("span", { className: "text-xs font-medium text-primary-foreground", children: initials }) }) }),
    /* @__PURE__ */ jsxs23(
      Transition,
      {
        as: "div",
        className: cn(
          "origin-top-right z-10 absolute top-full min-w-[11rem] bg-card border border-border py-1.5 rounded-lg shadow-lg overflow-hidden mt-1",
          align === "right" ? "right-0" : "left-0"
        ),
        enter: "transition ease-out duration-200 transform",
        enterFrom: "opacity-0 -translate-y-2",
        enterTo: "opacity-100 translate-y-0",
        leave: "transition ease-out duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: [
          /* @__PURE__ */ jsxs23("div", { className: "pt-0.5 pb-2 px-3 mb-1 border-b border-border", children: [
            /* @__PURE__ */ jsx38("div", { className: "font-medium text-foreground", children: name }),
            /* @__PURE__ */ jsx38("div", { className: "text-xs text-muted-foreground italic", children: role })
          ] }),
          /* @__PURE__ */ jsx38(MenuItems, { as: "ul", className: "focus:outline-none", children: items.map((item) => /* @__PURE__ */ jsx38(MenuItem, { as: "li", children: ({ active }) => /* @__PURE__ */ jsx38(
            "a",
            {
              className: cn(
                "font-medium text-sm flex items-center py-1 px-3 rounded-md text-primary hover:bg-muted transition-colors",
                active && "bg-muted"
              ),
              href: item.href,
              onClick: item.onClick,
              children: item.label
            }
          ) }, item.href)) })
        ]
      }
    )
  ] }) });
}
__name(DropdownProfile, "DropdownProfile");

// components/ui/logo.tsx
import { jsx as jsx39, jsxs as jsxs24 } from "react/jsx-runtime";
function Logo({ className, ariaLabel = "Logo" } = {}) {
  return /* @__PURE__ */ jsx39("span", { className: cn("inline-flex", className), children: /* @__PURE__ */ jsxs24(
    "svg",
    {
      width: "60",
      height: "32",
      viewBox: "0 0 60 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: cn("h-6 w-auto text-primary transition-colors duration-200"),
      "aria-label": ariaLabel,
      role: "img",
      children: [
        /* @__PURE__ */ jsxs24("g", { clipPath: "url(#clip0_4002_249)", children: [
          /* @__PURE__ */ jsx39(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M48.3457 0.350734C50.9943 1.38463 52.3187 4.4078 51.2907 7.07171L42.9082 28.6863C41.8802 31.3504 38.8743 32.6836 36.2454 31.6496C33.5956 30.6145 32.2712 27.5925 33.2992 24.9274L41.6618 3.29407C42.6912 0.648793 45.6957 -0.683161 48.3457 0.350734Z",
              fill: "url(#paint0_linear_logo)"
            }
          ),
          /* @__PURE__ */ jsx39(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M15.2661 0.350734C17.8941 1.38463 19.2074 4.4078 18.1682 7.07171L9.875 28.6863C8.85556 31.3504 5.87467 32.6836 3.24802 31.6496C0.639721 30.6145 -0.673608 27.5925 0.345829 24.9274L8.64039 3.29407C9.65984 0.648793 12.6394 -0.683161 15.2661 0.350734Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx39(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M31.8237 0.350734C34.4517 1.38463 35.765 4.4078 34.7258 7.07171L26.4327 28.6863C25.4132 31.3504 22.4322 32.6836 19.8056 31.6496C17.1973 30.6145 15.884 27.5925 16.9035 24.9274L25.1979 3.29407C26.2174 0.648793 29.1969 -0.683161 31.8237 0.350734Z",
              fill: "currentColor"
            }
          ),
          /* @__PURE__ */ jsx39(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M15.2957 0.350734C12.664 -0.683162 9.67861 0.648794 8.65718 3.29407L0.346501 24.9274C-0.674917 27.5925 0.640963 30.6145 3.25433 31.6496C5.88608 32.6836 8.87277 31.3504 9.8942 28.6863L18.2036 7.07171C19.2448 4.4078 17.9289 1.38463 15.2957 0.350734ZM44.7039 0.350734C42.0721 1.38463 40.7562 4.4078 41.7777 7.07171L50.087 28.6863C51.1282 31.3504 54.1136 32.6836 56.7269 31.6496C59.3587 30.6145 60.6746 27.5925 59.6544 24.9274L51.3241 3.29407C50.3026 0.648794 47.3172 -0.683162 44.7039 0.350734ZM31.8961 0.350734C34.5082 1.38463 35.8239 4.4078 34.8039 7.07171L26.4933 28.6863C25.4718 31.3504 22.4864 32.6836 19.8533 31.6496C17.2216 30.6145 15.9057 27.5925 16.927 24.9274L25.2562 3.29407C26.2775 0.648794 29.2629 -0.683162 31.8961 0.350734Z",
              fill: "currentColor"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs24("defs", { children: [
          /* @__PURE__ */ jsxs24("linearGradient", { id: "paint0_linear_logo", x1: "42.2949", y1: "0", x2: "42.2949", y2: "32", gradientUnits: "userSpaceOnUse", children: [
            /* @__PURE__ */ jsx39("stop", { stopColor: "currentColor" }),
            /* @__PURE__ */ jsx39("stop", { offset: "1", stopColor: "currentColor", stopOpacity: "0.32" })
          ] }),
          /* @__PURE__ */ jsx39("clipPath", { id: "clip0_4002_249", children: /* @__PURE__ */ jsx39("rect", { width: "60", height: "32", fill: "white" }) })
        ] })
      ]
    }
  ) });
}
__name(Logo, "Logo");

// components/ui/sidebar.tsx
import * as React26 from "react";
import { jsx as jsx40, jsxs as jsxs25 } from "react/jsx-runtime";
function SidebarLink({
  children,
  href,
  active = false,
  leadingIcon,
  onClick,
  className
}) {
  return /* @__PURE__ */ jsxs25(
    "a",
    {
      href,
      onClick,
      className: cn(
        "flex items-center gap-2 truncate rounded-md px-2.5 py-2 text-sm font-medium transition-colors cursor-pointer",
        active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        "[&>svg]:size-4 [&>svg]:shrink-0",
        className
      ),
      children: [
        leadingIcon,
        /* @__PURE__ */ jsx40("span", { className: "truncate", children })
      ]
    }
  );
}
__name(SidebarLink, "SidebarLink");
function SidebarLinkGroup({ children, open = false, className }) {
  const [openGroup, setOpenGroup] = React26.useState(open);
  const handleClick = /* @__PURE__ */ __name(() => setOpenGroup((v) => !v), "handleClick");
  return /* @__PURE__ */ jsx40("li", { className: cn("pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 group", className), children: children(handleClick, openGroup) });
}
__name(SidebarLinkGroup, "SidebarLinkGroup");
function SidebarMenuButton({
  children,
  isActive = false,
  leadingIcon,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs25(
    "button",
    {
      type: "button",
      className: cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-md px-2.5 py-2 text-left text-sm outline-none transition-colors cursor-pointer",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "bg-muted text-foreground font-medium",
        "[&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate",
        className
      ),
      "data-active": isActive,
      ...props,
      children: [
        leadingIcon,
        children != null && children !== "" ? /* @__PURE__ */ jsx40("span", { className: "truncate", children }) : null
      ]
    }
  );
}
__name(SidebarMenuButton, "SidebarMenuButton");
function Sidebar({
  open,
  onOpenChange,
  showBackdrop = true,
  variant = "sidebar",
  collapsible = "none",
  side = "left",
  className,
  headerSlot,
  footerSlot,
  children
}) {
  const sidebarRef = React26.useRef(null);
  React26.useEffect(() => {
    if (!open) return;
    const handler = /* @__PURE__ */ __name((e) => {
      if (!sidebarRef.current?.contains(e.target)) onOpenChange(false);
    }, "handler");
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onOpenChange]);
  React26.useEffect(() => {
    if (!open) return;
    const handler = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onOpenChange(false);
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);
  const containerChrome = variant === "sidebar" ? side === "left" ? "border-r border-sidebar-border bg-sidebar text-sidebar-foreground" : "border-l border-sidebar-border bg-sidebar text-sidebar-foreground" : cn(
    "rounded-xl border border-sidebar-border bg-sidebar text-sidebar-foreground",
    "shadow-[var(--shadow-sm)]",
    variant === "floating" && "m-2",
    variant === "inset" && "m-2"
  );
  const widthClasses = collapsible === "icon" ? "w-64 lg:w-14 lg:hover:w-64" : "w-64";
  const mobilePosition = side === "left" ? "left-0" : "right-0";
  const mobileClosedTranslate = side === "left" ? "-translate-x-full" : "translate-x-full";
  return /* @__PURE__ */ jsxs25("div", { className: cn("min-w-fit", className), "data-variant": variant, "data-collapsible": collapsible, "data-side": side, children: [
    showBackdrop ? /* @__PURE__ */ jsx40(
      "div",
      {
        className: cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-200",
          open ? "opacity-100 bg-foreground/20" : "opacity-0 pointer-events-none"
        ),
        "aria-hidden": true,
        onClick: () => onOpenChange(false)
      }
    ) : null,
    /* @__PURE__ */ jsxs25(
      "div",
      {
        ref: sidebarRef,
        className: cn(
          "flex flex-col absolute z-50 lg:static top-0 lg:translate-x-0 min-h-[280px] lg:min-h-[100dvh] overflow-y-auto transition-all duration-200 ease-out",
          mobilePosition,
          widthClasses,
          containerChrome,
          open ? "translate-x-0" : mobileClosedTranslate
        ),
        "aria-hidden": !open && collapsible === "offcanvas",
        children: [
          headerSlot != null ? /* @__PURE__ */ jsx40("div", { className: "shrink-0", children: headerSlot }) : null,
          /* @__PURE__ */ jsx40("div", { className: "flex-1 min-h-0 overflow-auto", children }),
          footerSlot != null ? /* @__PURE__ */ jsx40("div", { className: "shrink-0 border-t border-sidebar-border", children: footerSlot }) : null
        ]
      }
    )
  ] });
}
__name(Sidebar, "Sidebar");
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    "div",
    {
      "data-slot": "sidebar-header",
      className: cn("flex flex-col gap-2 p-3", className),
      ...props
    }
  );
}
__name(SidebarHeader, "SidebarHeader");
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    "div",
    {
      "data-slot": "sidebar-footer",
      className: cn("flex flex-col gap-2 p-3", className),
      ...props
    }
  );
}
__name(SidebarFooter, "SidebarFooter");
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    "div",
    {
      "data-slot": "sidebar-content",
      className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className),
      ...props
    }
  );
}
__name(SidebarContent, "SidebarContent");
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    "div",
    {
      "data-slot": "sidebar-group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
__name(SidebarGroup, "SidebarGroup");
function SidebarGroupLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    "div",
    {
      "data-slot": "sidebar-group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
__name(SidebarGroupLabel, "SidebarGroupLabel");
function SidebarGroupContent({ className, ...props }) {
  return /* @__PURE__ */ jsx40("div", { "data-slot": "sidebar-group-content", className: cn("w-full text-sm", className), ...props });
}
__name(SidebarGroupContent, "SidebarGroupContent");
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    "ul",
    {
      "data-slot": "sidebar-menu",
      className: cn("flex w-full min-w-0 flex-col gap-0.5 list-none p-0 m-0", className),
      ...props
    }
  );
}
__name(SidebarMenu, "SidebarMenu");
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx40("li", { "data-slot": "sidebar-menu-item", className: cn("group/menu-item relative", className), ...props });
}
__name(SidebarMenuItem, "SidebarMenuItem");
function SidebarInput(props) {
  return /* @__PURE__ */ jsx40(
    Input,
    {
      "data-slot": "sidebar-input",
      className: "shadow-none",
      ...props
    }
  );
}
__name(SidebarInput, "SidebarInput");
function SidebarSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx40(
    Separator2,
    {
      "data-slot": "sidebar-separator",
      className: cn("bg-sidebar-border mx-2 w-auto", className),
      ...props
    }
  );
}
__name(SidebarSeparator, "SidebarSeparator");

// components/ui/alert-dialog.tsx
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { jsx as jsx41, jsxs as jsxs26 } from "react/jsx-runtime";
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ jsx41(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
__name(AlertDialog, "AlertDialog");
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx41(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
__name(AlertDialogTrigger, "AlertDialogTrigger");
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx41(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
__name(AlertDialogPortal, "AlertDialogPortal");
function AlertDialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx41(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 z-[80]",
        "bg-foreground/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      ),
      ...props
    }
  );
}
__name(AlertDialogOverlay, "AlertDialogOverlay");
function AlertDialogContent({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs26(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx41(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx41(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "fixed left-1/2 top-1/2 z-[81] grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4",
          "rounded-xl border border-border bg-card text-card-foreground shadow-xl",
          "p-6 sm:max-w-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          className
        ),
        ...props,
        children
      }
    )
  ] });
}
__name(AlertDialogContent, "AlertDialogContent");
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx41(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-1.5 text-center sm:text-left", className),
      ...props
    }
  );
}
__name(AlertDialogHeader, "AlertDialogHeader");
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx41(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
__name(AlertDialogFooter, "AlertDialogFooter");
function AlertDialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx41(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold leading-none", className),
      ...props
    }
  );
}
__name(AlertDialogTitle, "AlertDialogTitle");
function AlertDialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx41(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(AlertDialogDescription, "AlertDialogDescription");
function AlertDialogAction({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx41(
    AlertDialogPrimitive.Action,
    {
      "data-slot": "alert-dialog-action",
      "data-variant": variant,
      className: cn(
        "inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "default" ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90" : "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        className
      ),
      ...props
    }
  );
}
__name(AlertDialogAction, "AlertDialogAction");
function AlertDialogCancel({ className, ...props }) {
  return /* @__PURE__ */ jsx41(
    AlertDialogPrimitive.Cancel,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground shadow-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:mt-0",
        className
      ),
      ...props
    }
  );
}
__name(AlertDialogCancel, "AlertDialogCancel");

// components/ui/modal.tsx
import { X as X5 } from "lucide-react";
import { jsx as jsx42, jsxs as jsxs27 } from "react/jsx-runtime";
function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  hideClose = false,
  className,
  panelClassName,
  bodyClassName,
  footerClassName,
  headerClassName
}) {
  const maxW = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-2xl" : size === "xl" ? "max-w-4xl" : "max-w-lg";
  return /* @__PURE__ */ jsx42(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs27(
    DialogContent,
    {
      className: cn("p-0 overflow-hidden", maxW, className, panelClassName),
      showCloseButton: false,
      children: [
        title || description || !hideClose ? /* @__PURE__ */ jsx42(DialogHeader, { className: cn("px-5 py-4", headerClassName), children: /* @__PURE__ */ jsxs27("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxs27("div", { className: "min-w-0", children: [
            title ? /* @__PURE__ */ jsx42(DialogTitle, { className: "text-base font-semibold text-foreground", children: title }) : null,
            description ? /* @__PURE__ */ jsx42(DialogDescription, { className: "mt-1", children: description }) : null
          ] }),
          !hideClose ? /* @__PURE__ */ jsx42(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx42(Button, { variant: "icon-ghost", size: "icon-sm", "aria-label": "Close modal", children: /* @__PURE__ */ jsx42(X5, { className: "h-4 w-4", "aria-hidden": true }) }) }) : null
        ] }) }) : null,
        title || description || !hideClose ? /* @__PURE__ */ jsx42(Separator2, {}) : null,
        /* @__PURE__ */ jsx42("div", { className: cn("px-5 py-4", bodyClassName), children }),
        footer ? /* @__PURE__ */ jsx42(Separator2, {}) : null,
        footer ? /* @__PURE__ */ jsx42("div", { className: cn("px-5 py-4", footerClassName), children: footer }) : null
      ]
    }
  ) });
}
__name(Modal, "Modal");

// components/ui/sheet.tsx
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { X as X6 } from "lucide-react";
import { jsx as jsx43, jsxs as jsxs28 } from "react/jsx-runtime";
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx43(DialogPrimitive2.Root, { "data-slot": "sheet", ...props });
}
__name(Sheet, "Sheet");
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ jsx43(DialogPrimitive2.Trigger, { "data-slot": "sheet-trigger", ...props });
}
__name(SheetTrigger, "SheetTrigger");
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ jsx43(DialogPrimitive2.Portal, { "data-slot": "sheet-portal", ...props });
}
__name(SheetPortal, "SheetPortal");
function SheetClose({ ...props }) {
  return /* @__PURE__ */ jsx43(DialogPrimitive2.Close, { "data-slot": "sheet-close", ...props });
}
__name(SheetClose, "SheetClose");
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx43(
    DialogPrimitive2.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        // Overlay should dim the whole page, including the sticky header (header uses z-50).
        "fixed inset-0 z-[80]",
        "bg-foreground/20",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      ),
      ...props
    }
  );
}
__name(SheetOverlay, "SheetOverlay");
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  const sideClasses = {
    // Inset sheets (do not touch window edges).
    right: "top-2 bottom-2 right-2 w-[min(94vw,32rem)] max-h-[calc(100vh-1rem)] rounded-xl",
    left: "top-2 bottom-2 left-2 w-[min(94vw,32rem)] max-h-[calc(100vh-1rem)] rounded-xl",
    // Full-width (but inset) sheets for top/bottom.
    top: "top-2 left-2 right-2 w-auto max-h-[calc(100vh-1rem)] rounded-xl",
    bottom: "bottom-2 left-2 right-2 w-auto max-h-[calc(100vh-1rem)] rounded-xl min-h-[min(70vh,34rem)]"
  };
  const motionClasses = {
    right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
  };
  return /* @__PURE__ */ jsxs28(SheetPortal, { children: [
    /* @__PURE__ */ jsx43(SheetOverlay, {}),
    /* @__PURE__ */ jsxs28(
      DialogPrimitive2.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "fixed z-[81] flex flex-col gap-4",
          "overflow-hidden",
          "border border-border bg-card text-card-foreground shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-300 data-[state=open]:duration-500",
          motionClasses[side],
          sideClasses[side],
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton ? /* @__PURE__ */ jsxs28(
            DialogPrimitive2.Close,
            {
              "data-slot": "sheet-close",
              className: cn(
                "absolute right-4 top-4 inline-flex items-center justify-center",
                "h-8 w-8 rounded-md",
                "cursor-pointer",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:cursor-not-allowed"
              ),
              children: [
                /* @__PURE__ */ jsx43(X6, { className: "h-4 w-4", "aria-hidden": true }),
                /* @__PURE__ */ jsx43("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) : null
        ]
      }
    )
  ] });
}
__name(SheetContent, "SheetContent");
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx43("div", { "data-slot": "sheet-header", className: cn("flex flex-col gap-1.5 p-6 pb-0", className), ...props });
}
__name(SheetHeader, "SheetHeader");
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx43(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col-reverse gap-2 p-6 pt-0 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
__name(SheetFooter, "SheetFooter");
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx43(
    DialogPrimitive2.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-lg font-semibold leading-none", className),
      ...props
    }
  );
}
__name(SheetTitle, "SheetTitle");
function SheetDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx43(
    DialogPrimitive2.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(SheetDescription, "SheetDescription");

// components/ui/table.tsx
import { jsx as jsx44 } from "react/jsx-runtime";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx44("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ jsx44("table", { "data-slot": "table", className: cn("w-full caption-bottom text-sm", className), ...props }) });
}
__name(Table, "Table");
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b [&_tr]:border-border", className),
      ...props
    }
  );
}
__name(TableHeader, "TableHeader");
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
__name(TableBody, "TableBody");
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn("border-t border-border bg-muted/30 [&>tr]:last:border-b-0", className),
      ...props
    }
  );
}
__name(TableFooter, "TableFooter");
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "border-b border-border transition-colors",
        "hover:bg-muted/40 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  );
}
__name(TableRow, "TableRow");
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "h-10 px-3 text-left align-middle text-sm text-muted-foreground whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
__name(TableHead, "TableHead");
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "px-3 py-3 align-middle text-sm text-foreground whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
__name(TableCell, "TableCell");
function TableCaption({ className, ...props }) {
  return /* @__PURE__ */ jsx44(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("mt-4 text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(TableCaption, "TableCaption");

// components/ui/hover-card.tsx
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { jsx as jsx45 } from "react/jsx-runtime";
function HoverCard({ ...props }) {
  return /* @__PURE__ */ jsx45(HoverCardPrimitive.Root, { "data-slot": "hover-card", ...props });
}
__name(HoverCard, "HoverCard");
function HoverCardTrigger({ ...props }) {
  return /* @__PURE__ */ jsx45(HoverCardPrimitive.Trigger, { "data-slot": "hover-card-trigger", ...props });
}
__name(HoverCardTrigger, "HoverCardTrigger");
function HoverCardContent({ className, align = "center", sideOffset = 8, ...props }) {
  return /* @__PURE__ */ jsx45(HoverCardPrimitive.Portal, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ jsx45(
    HoverCardPrimitive.Content,
    {
      "data-slot": "hover-card-content",
      align,
      sideOffset,
      className: cn(
        "z-[9999] w-72 rounded-lg border border-border bg-popover text-popover-foreground p-4 shadow-lg outline-hidden",
        "origin-[--radix-hover-card-content-transform-origin]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) });
}
__name(HoverCardContent, "HoverCardContent");

// components/ui/card-decorator.tsx
import { jsx as jsx46, jsxs as jsxs29 } from "react/jsx-runtime";
function CardDecorator({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs29(
    "div",
    {
      "data-slot": "card-decorator",
      className: cn(
        "relative grid h-36 w-36 place-items-center",
        "rounded-2xl border border-border bg-muted/30",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx46(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-card"
          }
        ),
        /* @__PURE__ */ jsx46(
          "div",
          {
            "data-slot": "card-decorator-center",
            className: cn(
              "relative z-10 grid h-12 w-12 place-items-center",
              "rounded-lg border border-border bg-card shadow-sm"
            ),
            children
          }
        )
      ]
    }
  );
}
__name(CardDecorator, "CardDecorator");

// components/ui/progress.tsx
import * as React27 from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { jsx as jsx47 } from "react/jsx-runtime";
var sizeClasses5 = {
  // Make the visual differences obvious in docs.
  sm: "h-1",
  md: "h-2",
  lg: "h-3"
};
var indicatorClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  // "Tertiary" in this system is a subtle surface + primary accent.
  // For progress, we interpret that as a subtle primary fill.
  tertiary: "bg-primary/40",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground",
  foreground: "bg-foreground"
};
var Progress = React27.forwardRef(({ className, value, variant = "primary", size = "md", ...props }, ref) => {
  const isIndeterminate = value === null;
  const clamped = Math.max(0, Math.min(100, Number(value ?? 0)));
  return /* @__PURE__ */ jsx47(
    ProgressPrimitive.Root,
    {
      ref,
      "data-slot": "progress",
      value: isIndeterminate ? null : clamped,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": isIndeterminate ? void 0 : clamped,
      "aria-valuetext": isIndeterminate ? "Loading" : void 0,
      className: cn(
        "relative w-full overflow-hidden rounded-full bg-muted",
        sizeClasses5[size],
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx47(
        ProgressPrimitive.Indicator,
        {
          "data-slot": "progress-indicator",
          className: cn(
            "h-full transition-[width] duration-200 ease-out rounded-full",
            indicatorClasses[variant],
            isIndeterminate ? "animate-pulse" : void 0
          ),
          style: { width: `${isIndeterminate ? 40 : clamped}%` }
        }
      )
    }
  );
});
Progress.displayName = "Progress";

// components/ui/slider.tsx
import * as React28 from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { jsx as jsx48, jsxs as jsxs30 } from "react/jsx-runtime";
var trackSizeClasses = {
  horizontal: { sm: "h-2", md: "h-2.5", lg: "h-3" },
  vertical: { sm: "w-2", md: "w-2.5", lg: "w-3" }
};
var thumbSizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5"
};
var rangeClasses = {
  // "Tertiary" in this system is a subtle surface + primary accent.
  // For slider, we interpret that as a subtle primary fill.
  tertiary: "bg-primary/40",
  foreground: "bg-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground"
};
var thumbBorderClasses = {
  tertiary: "border-border",
  foreground: "border-foreground",
  primary: "border-primary",
  secondary: "border-secondary",
  accent: "border-accent",
  destructive: "border-destructive",
  muted: "border-muted-foreground"
};
var thumbFillClasses = {
  tertiary: "bg-primary/40",
  foreground: "bg-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground"
};
var Slider = React28.forwardRef(
  ({
    className,
    size = "md",
    variant = "foreground",
    thumbStyle = "outline",
    marks,
    showMarkLabels = false,
    ...props
  }, ref) => {
    const orientation = props.orientation ?? "horizontal";
    const min2 = typeof props.min === "number" ? props.min : 0;
    const max2 = typeof props.max === "number" ? props.max : 100;
    const rawThumbValues = props.value ?? props.defaultValue ?? [min2];
    const thumbCount = Math.max(1, Array.isArray(rawThumbValues) ? rawThumbValues.length : 1);
    const safeMarks = marks?.map((m) => ({
      value: Math.max(min2, Math.min(max2, m.value)),
      label: m.label
    })) ?? [];
    const showLabels = showMarkLabels && safeMarks.some((m) => m.label != null);
    const trackBase = orientation === "vertical" ? "relative h-full grow overflow-hidden rounded-full bg-muted" : "relative w-full grow overflow-hidden rounded-full bg-muted";
    const rangeBase = orientation === "vertical" ? "absolute w-full rounded-full" : "absolute h-full rounded-full";
    const marksLabelContainer = orientation === "vertical" ? "relative h-full ml-3" : "relative w-full mt-2";
    const marksLabelText = orientation === "vertical" ? "absolute -translate-y-1/2 text-xs text-muted-foreground" : "absolute -translate-x-1/2 text-xs text-muted-foreground";
    return /* @__PURE__ */ jsxs30(
      "div",
      {
        "data-slot": "slider-wrapper",
        className: cn(orientation === "vertical" ? "flex h-full items-start gap-3" : "w-full"),
        children: [
          /* @__PURE__ */ jsxs30(
            SliderPrimitive.Root,
            {
              ref,
              "data-slot": "slider",
              className: cn(
                "relative flex touch-none select-none",
                orientation === "vertical" ? "h-full flex-col items-center" : "w-full items-center",
                className
              ),
              ...props,
              children: [
                /* @__PURE__ */ jsx48(
                  SliderPrimitive.Track,
                  {
                    "data-slot": "slider-track",
                    className: cn(trackBase, trackSizeClasses[orientation][size]),
                    children: /* @__PURE__ */ jsx48(
                      SliderPrimitive.Range,
                      {
                        "data-slot": "slider-range",
                        className: cn(rangeBase, rangeClasses[variant])
                      }
                    )
                  }
                ),
                Array.from({ length: thumbCount }).map((_, idx) => /* @__PURE__ */ jsx48(
                  SliderPrimitive.Thumb,
                  {
                    "data-slot": "slider-thumb",
                    className: cn(
                      "block rounded-full",
                      thumbSizeClasses[size],
                      thumbStyle === "solid" ? cn(thumbFillClasses[variant]) : cn("border bg-background", thumbBorderClasses[variant]),
                      "ring-offset-background transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "disabled:pointer-events-none disabled:opacity-50"
                    )
                  },
                  `thumb-${idx}`
                ))
              ]
            }
          ),
          showLabels ? /* @__PURE__ */ jsx48("div", { "data-slot": "slider-mark-labels", className: marksLabelContainer, "aria-hidden": "true", children: safeMarks.filter((m) => m.label != null).map((m) => {
            const pct = (m.value - min2) / (max2 - min2 || 1) * 100;
            const style = orientation === "vertical" ? { bottom: `${pct}%` } : { left: `${pct}%` };
            return /* @__PURE__ */ jsx48(
              "span",
              {
                className: marksLabelText,
                style,
                children: m.label
              },
              `mark-label-${m.value}`
            );
          }) }) : null
        ]
      }
    );
  }
);
Slider.displayName = "Slider";

// components/ui/skeleton.tsx
import * as React29 from "react";
import { jsx as jsx49 } from "react/jsx-runtime";
var toneClasses = {
  muted: "bg-muted",
  // Keep skeletons neutral by default (avoid theme accent hues unless explicitly needed).
  // Still token-driven: uses the `--muted` token with opacity.
  accent: "bg-muted/60"
};
var radiusClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full"
};
var lineHeightClasses = {
  sm: "h-3",
  md: "h-4",
  lg: "h-5"
};
var Skeleton = React29.forwardRef(
  ({
    className,
    lines,
    tone = "muted",
    radius = "md",
    lineSize = "md",
    ...props
  }, ref) => {
    const base = cn(
      // Motion-safe pulse; never animate for users who prefer reduced motion.
      "motion-safe:animate-pulse motion-reduce:animate-none",
      toneClasses[tone]
    );
    if (typeof lines === "number" && lines > 1) {
      const widths = ["w-full", "w-11/12", "w-5/6", "w-4/5"];
      return /* @__PURE__ */ jsx49("div", { ref, className: cn("space-y-2", className), ...props, children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsx49(
        "div",
        {
          "data-slot": "skeleton-line",
          className: cn(
            base,
            radiusClasses.md,
            lineHeightClasses[lineSize],
            widths[Math.min(i, widths.length - 1)]
          )
        },
        i
      )) });
    }
    return /* @__PURE__ */ jsx49(
      "div",
      {
        ref,
        "data-slot": "skeleton",
        className: cn(base, radiusClasses[radius], className),
        ...props
      }
    );
  }
);
Skeleton.displayName = "Skeleton";

// components/ui/loading-spinner.tsx
import { jsx as jsx50, jsxs as jsxs31 } from "react/jsx-runtime";
var sizeClasses6 = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12"
};
var variantClasses = {
  default: "text-muted-foreground",
  primary: "text-primary",
  white: "text-white",
  gray: "text-muted-foreground"
};
function LoadingSpinner({
  size = "md",
  variant = "default",
  className,
  text
}) {
  return /* @__PURE__ */ jsx50("div", { className: cn("flex items-center justify-center", className), children: /* @__PURE__ */ jsxs31("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsxs31(
      "svg",
      {
        className: cn("animate-spin", sizeClasses6[size], variantClasses[variant]),
        fill: "none",
        viewBox: "0 0 24 24",
        children: [
          /* @__PURE__ */ jsx50("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
          /* @__PURE__ */ jsx50("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ]
      }
    ),
    text && /* @__PURE__ */ jsx50("span", { className: cn("text-sm", variantClasses[variant]), children: text })
  ] }) });
}
__name(LoadingSpinner, "LoadingSpinner");
function CardSkeleton({ className }) {
  return /* @__PURE__ */ jsxs31(
    "div",
    {
      "data-slot": "card-skeleton",
      className: cn("rounded-xl border border-border bg-card p-4", className),
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsx50(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsx50(Skeleton, { className: "h-4 w-1/2 mt-2", tone: "accent" }),
        /* @__PURE__ */ jsx50(Skeleton, { className: "mt-4 h-40 w-full", radius: "lg" }),
        /* @__PURE__ */ jsxs31("div", { className: "mt-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx50(Skeleton, { className: "h-9 w-24", radius: "md" }),
          /* @__PURE__ */ jsx50(Skeleton, { className: "h-9 w-20", radius: "md", tone: "accent" })
        ] })
      ]
    }
  );
}
__name(CardSkeleton, "CardSkeleton");
function TableSkeleton({ rows = 5, columns = 4 }) {
  return /* @__PURE__ */ jsxs31("div", { className: "rounded-xl border border-border bg-card overflow-hidden", "aria-busy": "true", children: [
    /* @__PURE__ */ jsx50("div", { className: "px-6 py-3 border-b border-border", children: /* @__PURE__ */ jsx50("div", { className: "flex gap-4", children: Array.from({ length: columns }).map((_, i) => /* @__PURE__ */ jsx50(Skeleton, { className: "h-4 flex-1" }, i)) }) }),
    Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ jsx50("div", { className: "px-6 py-4 border-b border-border last:border-b-0", children: /* @__PURE__ */ jsx50("div", { className: "flex gap-4", children: Array.from({ length: columns }).map((_2, colIndex) => /* @__PURE__ */ jsx50(Skeleton, { className: "h-4 flex-1" }, colIndex)) }) }, rowIndex))
  ] });
}
__name(TableSkeleton, "TableSkeleton");

// components/ui/error-boundary.tsx
import React30 from "react";
import { jsx as jsx51, jsxs as jsxs32 } from "react/jsx-runtime";
var ErrorBoundary = class extends React30.Component {
  static {
    __name(this, "ErrorBoundary");
  }
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Theme system error:", error, errorInfo);
  }
  resetError = /* @__PURE__ */ __name(() => {
    this.setState({
      hasError: false,
      error: null
    });
  }, "resetError");
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback2 = this.props.fallback;
        return /* @__PURE__ */ jsx51(Fallback2, { error: this.state.error, resetError: this.resetError });
      }
      return /* @__PURE__ */ jsxs32("div", { className: "rounded-lg border border-destructive bg-destructive/10 p-4", children: [
        /* @__PURE__ */ jsx51("h3", { className: "text-sm font-semibold text-destructive mb-2", children: "Theme Error" }),
        /* @__PURE__ */ jsx51("p", { className: "text-sm text-muted-foreground mb-4", children: this.state.error?.message || "An error occurred while applying the theme" }),
        /* @__PURE__ */ jsx51(Button, { onClick: this.resetError, size: "sm", variant: "outline", children: "Try Again" })
      ] });
    }
    return this.props.children;
  }
};
function ErrorFallback({
  error,
  resetError
}) {
  return /* @__PURE__ */ jsxs32("div", { className: "rounded-lg border border-destructive bg-destructive/10 p-4", children: [
    /* @__PURE__ */ jsx51("h3", { className: "text-sm font-semibold text-destructive mb-2", children: "Something went wrong" }),
    /* @__PURE__ */ jsx51("p", { className: "text-sm text-muted-foreground mb-4", children: error?.message || "An unexpected error occurred" }),
    /* @__PURE__ */ jsx51(Button, { onClick: resetError, size: "sm", variant: "outline", children: "Try Again" })
  ] });
}
__name(ErrorFallback, "ErrorFallback");
function useErrorHandler() {
  const [error, setError] = React30.useState(null);
  const resetError = React30.useCallback(() => {
    setError(null);
  }, []);
  const handleError = React30.useCallback((err) => {
    setError(err instanceof Error ? err : new Error(String(err)));
  }, []);
  return {
    error,
    setError,
    resetError,
    handleError
  };
}
__name(useErrorHandler, "useErrorHandler");

// components/ui/calendar.tsx
import * as React31 from "react";
import { ChevronDown as ChevronDown5 } from "lucide-react";
import { DayPicker, UI } from "react-day-picker";
import { jsx as jsx52, jsxs as jsxs33 } from "react/jsx-runtime";
function CalendarDropdown(props) {
  const { options, className, components, classNames, ...selectProps } = props;
  const selectedOption = options?.find(({ value }) => value === selectProps.value);
  const cssClassSelect = [classNames[UI.Dropdown], className].filter(Boolean).join(" ");
  const Select2 = components.Select;
  const Option = components.Option;
  return /* @__PURE__ */ jsxs33("span", { "data-disabled": selectProps.disabled, className: classNames[UI.DropdownRoot], children: [
    React31.createElement(Select2, { className: cssClassSelect, ...selectProps }, options?.map(({ value, label, disabled }) => React31.createElement(Option, { key: value, value, disabled }, label))),
    /* @__PURE__ */ jsxs33("span", { className: classNames[UI.CaptionLabel], "aria-hidden": "true", children: [
      selectedOption?.label,
      /* @__PURE__ */ jsx52(ChevronDown5, { className: "size-3 shrink-0 opacity-40 text-muted-foreground" })
    ] })
  ] });
}
__name(CalendarDropdown, "CalendarDropdown");
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ jsx52(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3 text-foreground", className),
      classNames: {
        months: "relative flex flex-col sm:flex-row space-y-4 sm:space-y-0",
        month_caption: "flex justify-center items-center h-10 min-h-[2.5rem] shrink-0 relative leading-none",
        caption_label: "text-xs font-medium inline-flex items-center gap-2 pointer-events-none",
        dropdowns: "flex items-center justify-center gap-2 w-full",
        dropdown_root: "relative flex items-center justify-center gap-2 rounded-md border border-border bg-field h-7 min-h-7 pl-2.5 pr-2 py-1 text-xs text-foreground",
        dropdown: "absolute inset-0 w-full h-full cursor-pointer opacity-0 appearance-none bg-transparent",
        months_dropdown: "min-w-[5.5rem]",
        years_dropdown: "min-w-[4.5rem]",
        nav: "absolute left-3 right-3 top-0 flex items-center justify-between h-10 min-h-[2.5rem] pointer-events-none [&_button]:pointer-events-auto",
        button_previous: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:opacity-100 [&_svg]:size-[7px_11px] size-7 min-h-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-50",
        button_next: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:opacity-100 [&_svg]:size-[7px_11px] size-7 min-h-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-50",
        chevron: "fill-current shrink-0 w-3 h-3 opacity-50 text-muted-foreground",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground font-medium rounded-md w-9 text-xs",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-muted [&:has([aria-selected])]:bg-primary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary hover:text-primary-foreground h-9 w-9 p-0 aria-selected:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        range_start: "rounded-l-lg",
        range_end: "day-range-end rounded-r-lg",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-primary text-primary-foreground",
        outside: "day-outside text-muted-foreground aria-selected:bg-primary/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-primary/70 aria-selected:text-primary-foreground",
        hidden: "invisible",
        ...classNames
      },
      components: {
        Dropdown: CalendarDropdown,
        Chevron: /* @__PURE__ */ __name((props2) => {
          const svgClass = cn("fill-current shrink-0", props2.className);
          if (props2.orientation === "left") {
            return /* @__PURE__ */ jsx52("svg", { className: svgClass, width: "7", height: "11", viewBox: "0 0 7 11", children: /* @__PURE__ */ jsx52("path", { d: "M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" }) });
          }
          if (props2.orientation === "right") {
            return /* @__PURE__ */ jsx52("svg", { className: svgClass, width: "7", height: "11", viewBox: "0 0 7 11", children: /* @__PURE__ */ jsx52("path", { d: "M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" }) });
          }
          return null;
        }, "Chevron")
      },
      ...props
    }
  );
}
__name(Calendar, "Calendar");
Calendar.displayName = "Calendar";

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constants.js
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;
var constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);
  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);
  if (date instanceof Date) return new date.constructor(value);
  return new Date(value);
}
__name(constructFrom, "constructFrom");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function toDate(argument, context) {
  return constructFrom(context || argument, argument);
}
__name(toDate, "toDate");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
__name(getDefaultOptions, "getDefaultOptions");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function startOfWeek(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
__name(startOfWeek, "startOfWeek");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}
__name(startOfISOWeek, "startOfISOWeek");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
__name(getISOWeekYear, "getISOWeekYear");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}
__name(getTimezoneOffsetInMilliseconds, "getTimezoneOffsetInMilliseconds");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object")
  );
  return dates.map(normalize);
}
__name(normalizeDates, "normalizeDates");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}
__name(startOfDay, "startOfDay");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);
  const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}
__name(differenceInCalendarDays, "differenceInCalendarDays");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}
__name(startOfISOWeekYear, "startOfISOWeekYear");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
__name(isDate, "isDate");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function isValid(date) {
  return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
}
__name(isValid, "isValid");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}
__name(startOfYear, "startOfYear");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = /* @__PURE__ */ __name((token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
}, "formatDistance");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
__name(buildFormatLongFn, "buildFormatLongFn");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatLong.js
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatRelative.js
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = /* @__PURE__ */ __name((token, _date, _baseDate, _options) => formatRelativeLocale[token], "formatRelative");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}
__name(buildLocalizeFn, "buildLocalizeFn");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/localize.js
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = /* @__PURE__ */ __name((dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
}, "ordinalNumber");
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: /* @__PURE__ */ __name((quarter) => quarter - 1, "argumentCallback")
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern2) => pattern2.test(matchedString)) : (
      // [TODO] -- I challenge you to fix the type
      findKey(parsePatterns, (pattern2) => pattern2.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
__name(buildMatchFn, "buildMatchFn");
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
__name(findKey, "findKey");
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
__name(findIndex, "findIndex");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
__name(buildMatchPatternFn, "buildMatchPatternFn");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/match.js
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: /* @__PURE__ */ __name((value) => parseInt(value, 10), "valueCallback")
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: /* @__PURE__ */ __name((index) => index + 1, "valueCallback")
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}
__name(getDayOfYear, "getDayOfYear");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}
__name(getISOWeek, "getISOWeek");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}
__name(getWeekYear, "getWeekYear");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function startOfWeekYear(date, options) {
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}
__name(startOfWeekYear, "startOfWeekYear");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}
__name(getWeek, "getWeek");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}
__name(addLeadingZeros, "addLeadingZeros");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/formatters.js
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: /* @__PURE__ */ __name(function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  }, "G"),
  // Year
  y: /* @__PURE__ */ __name(function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  }, "y"),
  // Local week-numbering year
  Y: /* @__PURE__ */ __name(function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  }, "Y"),
  // ISO week-numbering year
  R: /* @__PURE__ */ __name(function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  }, "R"),
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: /* @__PURE__ */ __name(function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  }, "u"),
  // Quarter
  Q: /* @__PURE__ */ __name(function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "Q"),
  // Stand-alone quarter
  q: /* @__PURE__ */ __name(function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  }, "q"),
  // Month
  M: /* @__PURE__ */ __name(function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  }, "M"),
  // Stand-alone month
  L: /* @__PURE__ */ __name(function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  }, "L"),
  // Local week of year
  w: /* @__PURE__ */ __name(function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  }, "w"),
  // ISO week of year
  I: /* @__PURE__ */ __name(function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  }, "I"),
  // Day of the month
  d: /* @__PURE__ */ __name(function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  }, "d"),
  // Day of year
  D: /* @__PURE__ */ __name(function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  }, "D"),
  // Day of week
  E: /* @__PURE__ */ __name(function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "E"),
  // Local day of week
  e: /* @__PURE__ */ __name(function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "e"),
  // Stand-alone local day of week
  c: /* @__PURE__ */ __name(function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  }, "c"),
  // ISO day of week
  i: /* @__PURE__ */ __name(function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "i"),
  // AM or PM
  a: /* @__PURE__ */ __name(function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "a"),
  // AM, PM, midnight, noon
  b: /* @__PURE__ */ __name(function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "b"),
  // in the morning, in the afternoon, in the evening, at night
  B: /* @__PURE__ */ __name(function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  }, "B"),
  // Hour [1-12]
  h: /* @__PURE__ */ __name(function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  }, "h"),
  // Hour [0-23]
  H: /* @__PURE__ */ __name(function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  }, "H"),
  // Hour [0-11]
  K: /* @__PURE__ */ __name(function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  }, "K"),
  // Hour [1-24]
  k: /* @__PURE__ */ __name(function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  }, "k"),
  // Minute
  m: /* @__PURE__ */ __name(function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  }, "m"),
  // Second
  s: /* @__PURE__ */ __name(function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  }, "s"),
  // Fraction of second
  S: /* @__PURE__ */ __name(function(date, token) {
    return lightFormatters.S(date, token);
  }, "S"),
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: /* @__PURE__ */ __name(function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  }, "X"),
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: /* @__PURE__ */ __name(function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  }, "x"),
  // Timezone (GMT)
  O: /* @__PURE__ */ __name(function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  }, "O"),
  // Timezone (specific non-location)
  z: /* @__PURE__ */ __name(function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  }, "z"),
  // Seconds timestamp
  t: /* @__PURE__ */ __name(function(date, token, _localize) {
    const timestamp = Math.trunc(+date / 1e3);
    return addLeadingZeros(timestamp, token.length);
  }, "t"),
  // Milliseconds timestamp
  T: /* @__PURE__ */ __name(function(date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  }, "T")
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
__name(formatTimezoneShort, "formatTimezoneShort");
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
__name(formatTimezoneWithOptionalMinutes, "formatTimezoneWithOptionalMinutes");
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
__name(formatTimezone, "formatTimezone");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var dateLongFormatter = /* @__PURE__ */ __name((pattern2, formatLong2) => {
  switch (pattern2) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
}, "dateLongFormatter");
var timeLongFormatter = /* @__PURE__ */ __name((pattern2, formatLong2) => {
  switch (pattern2) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
}, "timeLongFormatter");
var dateTimeLongFormatter = /* @__PURE__ */ __name((pattern2, formatLong2) => {
  const matchResult = pattern2.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern2, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
}, "dateTimeLongFormatter");
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/protectedTokens.js
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
__name(isProtectedDayOfYearToken, "isProtectedDayOfYearToken");
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
__name(isProtectedWeekYearToken, "isProtectedWeekYearToken");
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
__name(warnOrThrowProtectedError, "warnOrThrowProtectedError");
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
__name(message, "message");

// ../../node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  const defaultOptions2 = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
  const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
  const originalDate = toDate(date, options?.in);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
__name(format, "format");
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}
__name(cleanEscapedString, "cleanEscapedString");

// components/ui/datepicker.tsx
import { Calendar as CalendarIcon } from "lucide-react";
import { Fragment as Fragment4, jsx as jsx53, jsxs as jsxs34 } from "react/jsx-runtime";
var triggerButtonClass = "inline-flex items-center gap-2 rounded-lg border border-input bg-field px-3 py-2 text-left text-sm font-normal text-foreground shadow-none transition-colors hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40 disabled:pointer-events-none disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0";
function DatePicker({
  value,
  onSelect,
  placeholder = "Pick a date",
  disabled = false,
  className,
  calendarProps
}) {
  return /* @__PURE__ */ jsxs34(Popover, { children: [
    /* @__PURE__ */ jsx53(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs34(
      "button",
      {
        type: "button",
        disabled,
        className: cn(triggerButtonClass, !value && "text-muted-foreground", className),
        children: [
          /* @__PURE__ */ jsx53(CalendarIcon, {}),
          value ? format(value, "PPP") : placeholder
        ]
      }
    ) }),
    /* @__PURE__ */ jsx53(PopoverContent, { className: "w-auto p-0", align: "start", collisionPadding: 16, avoidCollisions: true, children: /* @__PURE__ */ jsx53(
      Calendar,
      {
        mode: "single",
        selected: value,
        onSelect,
        initialFocus: true,
        ...calendarProps,
        required: false
      }
    ) })
  ] });
}
__name(DatePicker, "DatePicker");
function DatePickerRange({
  value,
  onSelect,
  placeholder = "Pick a date range",
  disabled = false,
  className,
  calendarProps
}) {
  return /* @__PURE__ */ jsxs34(Popover, { children: [
    /* @__PURE__ */ jsx53(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx53(
      Button,
      {
        variant: "outline",
        shape: "rounded",
        disabled,
        className: cn(
          "w-full min-w-[15rem] justify-start text-left font-normal rounded-lg shadow-none border-input bg-field hover:border-border/80 focus-visible:ring-0 focus-visible:border-foreground/40",
          !value?.from && "text-muted-foreground",
          className
        ),
        leadingIcon: /* @__PURE__ */ jsx53(CalendarIcon, { className: "size-4" }),
        children: value?.from ? value.to ? /* @__PURE__ */ jsxs34(Fragment4, { children: [
          format(value.from, "LLL dd, y"),
          " \u2013 ",
          format(value.to, "LLL dd, y")
        ] }) : format(value.from, "LLL dd, y") : placeholder
      }
    ) }),
    /* @__PURE__ */ jsx53(PopoverContent, { className: "w-auto p-0", align: "start", collisionPadding: 16, avoidCollisions: true, children: /* @__PURE__ */ jsx53(
      Calendar,
      {
        mode: "range",
        defaultMonth: value?.from,
        selected: value,
        onSelect,
        initialFocus: true,
        ...calendarProps,
        required: false
      }
    ) })
  ] });
}
__name(DatePickerRange, "DatePickerRange");

// components/ui/header.tsx
import { jsx as jsx54, jsxs as jsxs35 } from "react/jsx-runtime";
function Header({
  variant = "default",
  leftSlot,
  rightSlot
}) {
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  return /* @__PURE__ */ jsx54("header", { className: `sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-background/90 before:-z-10 z-30 ${variant === "v2" || variant === "v3" ? "before:bg-background after:absolute after:h-px after:inset-x-0 after:top-full after:bg-border after:-z-10" : "max-lg:shadow-sm lg:before:bg-muted/90"} ${variant === "v2" ? "" : ""} ${variant === "v3" ? "" : ""}`, children: /* @__PURE__ */ jsx54("div", { className: "px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs35("div", { className: `flex items-center justify-between h-16 ${variant === "v2" || variant === "v3" ? "" : "lg:border-b border-border"}`, children: [
    /* @__PURE__ */ jsxs35("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs35(
        "button",
        {
          className: "text-muted-foreground hover:text-foreground lg:hidden",
          "aria-controls": "sidebar",
          "aria-expanded": sidebarOpen,
          onClick: () => setSidebarOpen(!sidebarOpen),
          children: [
            /* @__PURE__ */ jsx54("span", { className: "sr-only", children: "Open sidebar" }),
            /* @__PURE__ */ jsxs35("svg", { className: "w-6 h-6 fill-current", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
              /* @__PURE__ */ jsx54("rect", { x: "4", y: "5", width: "16", height: "2" }),
              /* @__PURE__ */ jsx54("rect", { x: "4", y: "11", width: "16", height: "2" }),
              /* @__PURE__ */ jsx54("rect", { x: "4", y: "17", width: "16", height: "2" })
            ] })
          ]
        }
      ),
      leftSlot
    ] }),
    rightSlot != null && /* @__PURE__ */ jsx54("div", { className: "flex items-center space-x-3", children: rightSlot })
  ] }) }) });
}
__name(Header, "Header");

// components/ui/navbar.tsx
import Link2 from "next/link";
import { jsx as jsx55, jsxs as jsxs36 } from "react/jsx-runtime";
function Navbar({ brand, links = [], rightSlot, className }) {
  return /* @__PURE__ */ jsx55("div", { className: cn("sticky top-0 z-50 border-b border-border bg-background", className), children: /* @__PURE__ */ jsx55("div", { className: "mx-auto max-w-[1400px] px-4 sm:px-6", children: /* @__PURE__ */ jsxs36("div", { className: "h-14 flex items-center gap-4", children: [
    brand ?? /* @__PURE__ */ jsxs36("div", { className: "flex items-center gap-2 font-semibold text-foreground shrink-0", children: [
      /* @__PURE__ */ jsx55(Logo, {}),
      /* @__PURE__ */ jsx55("span", { className: "hidden sm:block", children: "Design System" })
    ] }),
    links.length > 0 ? /* @__PURE__ */ jsx55("nav", { className: "hidden md:flex items-center gap-1.5 min-w-0", children: links.map((link) => /* @__PURE__ */ jsx55(
      Link2,
      {
        href: link.href,
        className: "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
        children: link.label
      },
      link.href
    )) }) : null,
    rightSlot != null ? /* @__PURE__ */ jsx55("div", { className: "ml-auto flex items-center gap-2 min-w-0", children: rightSlot }) : null
  ] }) }) });
}
__name(Navbar, "Navbar");

// components/ui/tabs.tsx
import { jsx as jsx56, jsxs as jsxs37 } from "react/jsx-runtime";
function Tabs({
  items,
  value,
  onValueChange,
  variant = "container",
  className
}) {
  if (variant === "container") {
    return /* @__PURE__ */ jsx56("ul", { className: cn("inline-flex w-fit flex-wrap items-center gap-2", className), children: items.map((item) => /* @__PURE__ */ jsx56("li", { children: /* @__PURE__ */ jsxs37(
      "button",
      {
        type: "button",
        onClick: () => onValueChange(item.id),
        className: cn(
          // Pill tabs (Mindtris tokens)
          "inline-flex items-center justify-center gap-2 text-sm font-medium leading-5 rounded-full px-4 py-2 border transition-colors",
          // Icon normalization (shadcn-style)
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          value === item.id ? "bg-primary text-primary-foreground border-transparent" : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-border/80"
        ),
        children: [
          item.icon,
          /* @__PURE__ */ jsx56("span", { children: item.label })
        ]
      }
    ) }, item.id)) });
  }
  if (variant === "underline") {
    return /* @__PURE__ */ jsxs37("div", { className: cn("relative", className), children: [
      /* @__PURE__ */ jsx56("div", { className: "absolute bottom-0 w-full h-px bg-border", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx56("ul", { className: "relative text-sm font-medium flex flex-nowrap overflow-x-auto no-scrollbar", children: items.map((item) => {
        const active = item.id === value;
        return /* @__PURE__ */ jsx56("li", { className: "mr-6 last:mr-0", children: /* @__PURE__ */ jsx56(
          "button",
          {
            type: "button",
            onClick: () => onValueChange(item.id),
            className: cn(
              "block pb-3 whitespace-nowrap transition-colors",
              active ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
            ),
            children: /* @__PURE__ */ jsxs37("span", { className: "inline-flex items-center", children: [
              item.icon ? /* @__PURE__ */ jsx56("span", { className: "mr-2 text-muted-foreground", children: item.icon }) : null,
              item.label
            ] })
          }
        ) }, item.id);
      }) })
    ] });
  }
  return /* @__PURE__ */ jsx56("div", { className: cn("border-b border-border", className), children: /* @__PURE__ */ jsx56("ul", { className: "text-sm font-medium flex flex-nowrap overflow-x-auto no-scrollbar", children: items.map((item) => {
    const active = item.id === value;
    return /* @__PURE__ */ jsx56("li", { className: "pb-3 mr-6 last:mr-0", children: /* @__PURE__ */ jsx56(
      "button",
      {
        type: "button",
        onClick: () => onValueChange(item.id),
        className: cn(
          "whitespace-nowrap transition-colors",
          active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        ),
        children: /* @__PURE__ */ jsxs37("span", { className: "inline-flex items-center", children: [
          item.icon ? /* @__PURE__ */ jsx56("span", { className: "mr-2 text-muted-foreground", children: item.icon }) : null,
          item.label
        ] })
      }
    ) }, item.id);
  }) }) });
}
__name(Tabs, "Tabs");
function TabsWithContainer(props) {
  return /* @__PURE__ */ jsx56(Tabs, { ...props, variant: "container" });
}
__name(TabsWithContainer, "TabsWithContainer");

// components/ui/tabs-radix.tsx
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx57 } from "react/jsx-runtime";
function TabsRoot({ className, ...props }) {
  return /* @__PURE__ */ jsx57(TabsPrimitive.Root, { "data-slot": "tabs", className: cn("flex flex-col gap-2", className), ...props });
}
__name(TabsRoot, "TabsRoot");
function TabsList({ className, variant = "segmented", ...props }) {
  return /* @__PURE__ */ jsx57(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn(
        "group inline-flex w-fit items-center justify-center",
        variant === "segmented" ? (
          // Segmented-control container (Mindtris tokens)
          "bg-muted text-muted-foreground h-9 rounded-lg p-[3px]"
        ) : variant === "line" ? (
          // Line: no separator line behind tabs
          "bg-transparent text-muted-foreground h-auto rounded-none p-0 gap-6"
        ) : (
          // Line + separator: full-width baseline separator behind active underline
          "bg-transparent text-muted-foreground h-auto rounded-none p-0 gap-6 border-b border-border w-full"
        ),
        className
      ),
      ...props
    }
  );
}
__name(TabsList, "TabsList");
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx57(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap",
        // Icon normalization (shadcn-style)
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "text-muted-foreground hover:text-foreground",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        // Active: visually merges with list; no shadow
        "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-border data-[state=active]:shadow-none",
        // Line variant overrides (driven by TabsList data-variant)
        "group-data-[variant=line]:h-auto group-data-[variant=line]:rounded-none group-data-[variant=line]:border-0 group-data-[variant=line]:px-0 group-data-[variant=line]:py-2",
        "group-data-[variant=line]:data-[state=active]:bg-transparent group-data-[variant=line]:data-[state=active]:border-b-2 group-data-[variant=line]:data-[state=active]:border-foreground",
        // Line + separator overrides
        "group-data-[variant=line-separator]:h-auto group-data-[variant=line-separator]:rounded-none group-data-[variant=line-separator]:border-0 group-data-[variant=line-separator]:px-0 group-data-[variant=line-separator]:py-2",
        // Pull active underline onto baseline separator
        "group-data-[variant=line-separator]:data-[state=active]:bg-transparent group-data-[variant=line-separator]:data-[state=active]:border-b-[3px] group-data-[variant=line-separator]:data-[state=active]:border-foreground group-data-[variant=line-separator]:-mb-[2px]",
        className
      ),
      ...props
    }
  );
}
__name(TabsTrigger, "TabsTrigger");
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx57(TabsPrimitive.Content, { "data-slot": "tabs-content", className: cn("flex-1 outline-none", className), ...props });
}
__name(TabsContent, "TabsContent");

// components/ui/collapsible-section.tsx
import { ChevronDown as ChevronDown6, ChevronUp } from "lucide-react";
import { jsx as jsx58, jsxs as jsxs38 } from "react/jsx-runtime";
function CollapsibleSection({ title, open, onToggle, children, className }) {
  return /* @__PURE__ */ jsxs38(
    "div",
    {
      className: cn(
        "rounded-lg border border-border bg-card overflow-hidden shadow-none",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs38(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted/30 transition-colors",
            children: [
              /* @__PURE__ */ jsx58("span", { children: title }),
              open ? /* @__PURE__ */ jsx58(ChevronUp, { className: "w-4 h-4 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ jsx58(ChevronDown6, { className: "w-4 h-4 shrink-0 text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsx58("div", { className: "px-3 pb-3 pt-0 space-y-3 border-t border-border/50", children })
      ]
    }
  );
}
__name(CollapsibleSection, "CollapsibleSection");

// components/ui/collapsible.tsx
import * as React32 from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { jsx as jsx59 } from "react/jsx-runtime";
var Collapsible = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx59(
  CollapsiblePrimitive.Root,
  {
    ref,
    "data-slot": "collapsible",
    className: cn(className),
    ...props
  }
));
Collapsible.displayName = "Collapsible";
var CollapsibleTrigger = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx59(
  CollapsiblePrimitive.Trigger,
  {
    ref,
    "data-slot": "collapsible-trigger",
    className: cn(
      "flex items-center gap-2 rounded-md text-sm font-medium text-foreground outline-none transition-colors",
      "hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=open]:bg-muted/50",
      className
    ),
    ...props
  }
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";
var CollapsibleContent = React32.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx59(
  CollapsiblePrimitive.Content,
  {
    ref,
    "data-slot": "collapsible-content",
    className: cn("overflow-hidden text-sm text-muted-foreground", className),
    ...props
  }
));
CollapsibleContent.displayName = "CollapsibleContent";

// components/ui/chart.tsx
import * as React33 from "react";
import * as RechartsPrimitive from "recharts";
import { Fragment as Fragment5, jsx as jsx60, jsxs as jsxs39 } from "react/jsx-runtime";
var THEMES = { light: "", dark: ".dark" };
var ChartContext = React33.createContext(null);
function useChart() {
  const context = React33.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
__name(useChart, "useChart");
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React33.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx60(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs39(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "flex aspect-video justify-center text-xs",
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
        "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
        "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
        "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
        "[&_.recharts-radial-bar-background-sector]:fill-muted",
        "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
        "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
        "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
        "[&_.recharts-layer]:outline-none [&_.recharts-sector]:outline-none",
        "[&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx60(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx60(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
__name(ChartContainer, "ChartContainer");
function ChartStyle({
  id,
  config
}) {
  const colorConfig = Object.entries(config).filter(
    ([, item]) => item.theme || item.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx60(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] ?? itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).filter(Boolean).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
}
__name(ChartStyle, "ChartStyle");
var ChartTooltip = RechartsPrimitive.Tooltip;
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return void 0;
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
__name(getPayloadConfigFromPayload, "getPayloadConfigFromPayload");
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React33.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx60("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) return null;
    return /* @__PURE__ */ jsx60("div", { className: cn("font-medium", labelClassName), children: value });
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
  if (!active || !payload?.length) return null;
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs39(
    "div",
    {
      className: cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx60("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color ?? item.payload?.fill ?? item.color;
          return /* @__PURE__ */ jsx60(
            "div",
            {
              className: cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name !== void 0 ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs39(Fragment5, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsx60(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx60(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border border-[var(--color-border)] bg-[var(--color-bg)]",
                      indicator === "dot" && "size-2.5",
                      indicator === "line" && "w-1",
                      indicator === "dashed" && "w-0 border-[1.5px] border-dashed bg-transparent",
                      nestLabel && indicator === "dashed" && "my-0.5"
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs39(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs39("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx60("span", { className: "text-muted-foreground", children: itemConfig?.label ?? item.name })
                      ] }),
                      item.value != null && /* @__PURE__ */ jsx60("span", { className: "font-mono font-medium tabular-nums text-foreground", children: Number(item.value).toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            String(item.dataKey)
          );
        }) })
      ]
    }
  );
}
__name(ChartTooltipContent, "ChartTooltipContent");
var ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return /* @__PURE__ */ jsx60(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.map((item) => {
        const key = `${nameKey ?? item.dataKey ?? "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxs39(
          "div",
          {
            className: "flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground",
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx60(itemConfig.icon, {}) : /* @__PURE__ */ jsx60(
                "div",
                {
                  className: "size-2 shrink-0 rounded-[2px]",
                  style: { backgroundColor: item.color }
                }
              ),
              itemConfig?.label
            ]
          },
          String(item.value)
        );
      })
    }
  );
}
__name(ChartLegendContent, "ChartLegendContent");

// components/ui/form.tsx
import * as React34 from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider as RHFFormProvider,
  useFormContext as useRHFFormContext,
  useFormState as useRHFFormState
} from "react-hook-form";
import { jsx as jsx61 } from "react/jsx-runtime";
var Form = RHFFormProvider;
var FormFieldContext = React34.createContext(null);
function FormField(props) {
  return /* @__PURE__ */ jsx61(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx61(Controller, { ...props }) });
}
__name(FormField, "FormField");
var FormItemContext = React34.createContext(null);
function useFormField() {
  const fieldContext = React34.useContext(FormFieldContext);
  const itemContext = React34.useContext(FormItemContext);
  const { getFieldState } = useRHFFormContext();
  const formState = useRHFFormState({ name: fieldContext?.name });
  const fieldState = getFieldState(fieldContext?.name ?? "", formState);
  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }
  const id = itemContext?.id ?? "";
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
}
__name(useFormField, "useFormField");
function FormItem({ className, ...props }) {
  const id = React34.useId();
  return /* @__PURE__ */ jsx61(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx61(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
__name(FormItem, "FormItem");
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx61(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
__name(FormLabel, "FormLabel");
function FormControl(props) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx61(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
__name(FormControl, "FormControl");
function FormDescription({
  className,
  ...props
}) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx61(
    "p",
    {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(FormDescription, "FormDescription");
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx61(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-sm text-destructive", className),
      ...props,
      children: body
    }
  );
}
__name(FormMessage, "FormMessage");

// components/ui/navigation-menu.tsx
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { jsx as jsx62, jsxs as jsxs40 } from "react/jsx-runtime";
function NavigationMenuRoot({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs40(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport ? /* @__PURE__ */ jsx62(NavigationMenuViewport, {}) : null
      ]
    }
  );
}
__name(NavigationMenuRoot, "NavigationMenuRoot");
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
__name(NavigationMenuList, "NavigationMenuList");
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
__name(NavigationMenuItem, "NavigationMenuItem");
var navigationMenuTriggerClass = "inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground";
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs40(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerClass, "group gap-1", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx62(
          ChevronIcon,
          {
            className: "relative size-3 transition-transform duration-200 group-data-[state=open]:rotate-180",
            "aria-hidden": true
          }
        )
      ]
    }
  );
}
__name(NavigationMenuTrigger, "NavigationMenuTrigger");
function ChevronIcon({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: cn("shrink-0", className),
      ...props,
      children: /* @__PURE__ */ jsx62("path", { d: "m6 9 6 6 6-6" })
    }
  );
}
__name(ChevronIcon, "ChevronIcon");
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "left-0 top-0 w-full p-2 md:absolute md:w-auto",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        "group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-md",
        className
      ),
      ...props
    }
  );
}
__name(NavigationMenuContent, "NavigationMenuContent");
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62("div", { className: "absolute left-0 top-full z-50 flex justify-center", children: /* @__PURE__ */ jsx62(
    NavigationMenuPrimitive.Viewport,
    {
      "data-slot": "navigation-menu-viewport",
      className: cn(
        "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
        "md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      ),
      ...props
    }
  ) });
}
__name(NavigationMenuViewport, "NavigationMenuViewport");
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
__name(NavigationMenuLink, "NavigationMenuLink");
function NavigationMenuIndicator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx62(
    NavigationMenuPrimitive.Indicator,
    {
      "data-slot": "navigation-menu-indicator",
      className: cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx62("div", { className: "relative top-[60%] size-2 rotate-45 rounded-tl-sm border-border bg-border shadow-md" })
    }
  );
}
__name(NavigationMenuIndicator, "NavigationMenuIndicator");

// components/ui/theme-toggle-icon.tsx
import { useTheme as useTheme2 } from "next-themes";
import { Moon } from "lucide-react";

// lib/icon-constants.ts
var ICON_DEFAULT_SIZE = 16;
var ICON_DEFAULT_STROKE_WIDTH = 2.25;
var ICON_SIZES = {
  xs: 12,
  // h-3 w-3
  sm: 14,
  // h-3.5 w-3.5
  md: 16,
  // h-4 w-4 (default)
  lg: 20,
  // h-5 w-5
  xl: 24
  // h-6 w-6
};

// components/ui/icon.tsx
import { jsx as jsx63 } from "react/jsx-runtime";
function Icon({
  icon: IconComponent,
  size = "md",
  strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
  className,
  ...props
}) {
  const sizeValue = typeof size === "number" ? size : ICON_SIZES[size];
  return /* @__PURE__ */ jsx63(
    IconComponent,
    {
      className: cn("shrink-0", className),
      size: sizeValue,
      strokeWidth,
      ...props
    }
  );
}
__name(Icon, "Icon");
function createIcon(IconComponent, options = {}) {
  const {
    size = "md",
    strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
    className
  } = options;
  const sizeValue = typeof size === "number" ? size : ICON_SIZES[size];
  return /* @__PURE__ */ jsx63(
    IconComponent,
    {
      className: cn("shrink-0", className),
      size: sizeValue,
      strokeWidth
    }
  );
}
__name(createIcon, "createIcon");

// components/ui/theme-toggle-icon.tsx
import { jsx as jsx64, jsxs as jsxs41 } from "react/jsx-runtime";
function ThemeToggleIcon() {
  const { theme, setTheme } = useTheme2();
  return /* @__PURE__ */ jsxs41("div", { children: [
    /* @__PURE__ */ jsx64(
      "input",
      {
        type: "checkbox",
        name: "light-switch",
        id: "light-switch",
        className: "light-switch sr-only",
        checked: theme === "light",
        onChange: () => {
          if (theme === "dark") {
            return setTheme("light");
          }
          return setTheme("dark");
        }
      }
    ),
    /* @__PURE__ */ jsxs41(
      "label",
      {
        className: cn(
          "flex items-center justify-center cursor-pointer w-8 h-8 rounded-full transition-colors",
          "hover:bg-muted"
        ),
        htmlFor: "light-switch",
        children: [
          createIcon(Moon, { size: 16, strokeWidth: 2.25, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsx64("span", { className: "sr-only", children: "Switch to light / dark version" })
        ]
      }
    )
  ] });
}
__name(ThemeToggleIcon, "ThemeToggleIcon");

// components/ui/kbd.tsx
import * as React35 from "react";
import { jsx as jsx65 } from "react/jsx-runtime";
var sizeClasses7 = {
  sm: "px-1.5 py-0.5 text-[10px]",
  default: "px-2 py-1 text-xs",
  lg: "px-2.5 py-1.5 text-sm"
};
var Kbd = React35.forwardRef(
  ({ className, size = "default", children, ...props }, ref) => {
    return /* @__PURE__ */ jsx65(
      "kbd",
      {
        ref,
        "data-slot": "kbd",
        "data-size": size,
        className: cn(
          "inline-flex items-center justify-center rounded border font-mono font-medium",
          "border-border bg-muted text-muted-foreground",
          "shadow-[0_1px_0_0_var(--border)]",
          sizeClasses7[size],
          className
        ),
        ...props,
        children
      }
    );
  }
);
Kbd.displayName = "Kbd";

// components/ui/scroll-area.tsx
import * as React36 from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { jsx as jsx66, jsxs as jsxs42 } from "react/jsx-runtime";
function isHorizontalScrollBar(child) {
  return React36.isValidElement(child) && child.type === ScrollBar && child.props.orientation === "horizontal";
}
__name(isHorizontalScrollBar, "isHorizontalScrollBar");
var ScrollArea = React36.forwardRef(({ className, children, ...props }, ref) => {
  const childList = React36.Children.toArray(children);
  const viewportChildren = childList.filter((c) => !isHorizontalScrollBar(c));
  const horizontalBars = childList.filter((c) => isHorizontalScrollBar(c));
  return /* @__PURE__ */ jsxs42(
    ScrollAreaPrimitive.Root,
    {
      ref,
      "data-slot": "scroll-area",
      className: cn("relative overflow-hidden", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx66(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "h-full w-full rounded-[inherit]",
            children: viewportChildren
          }
        ),
        /* @__PURE__ */ jsx66(ScrollBar, {}),
        horizontalBars,
        /* @__PURE__ */ jsx66(ScrollAreaPrimitive.Corner, { "data-slot": "scroll-area-corner" })
      ]
    }
  );
});
ScrollArea.displayName = "ScrollArea";
var ScrollBar = React36.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx66(
  ScrollAreaPrimitive.Scrollbar,
  {
    ref,
    "data-slot": "scroll-area-scrollbar",
    orientation,
    className: cn(
      "flex touch-none select-none p-0.5 transition-colors",
      orientation === "vertical" ? "h-full w-2 border-l border-l-transparent" : "h-2 flex-col border-t border-t-transparent",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx66(
      ScrollAreaPrimitive.Thumb,
      {
        "data-slot": "scroll-area-thumb",
        className: cn(
          "relative flex-1 rounded-full bg-border hover:bg-muted-foreground/50"
        )
      }
    )
  }
));
ScrollBar.displayName = "ScrollBar";

// components/ui/resizable.tsx
import * as React37 from "react";
import { Group as Group4, Panel, Separator as Separator6 } from "react-resizable-panels";
import { GripVertical } from "lucide-react";
import { jsx as jsx67 } from "react/jsx-runtime";
function ResizablePanelGroup({
  className,
  direction = "horizontal",
  orientation: orientationProp,
  ...props
}) {
  const orientation = orientationProp ?? direction;
  return /* @__PURE__ */ jsx67(
    Group4,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      ),
      orientation,
      ...props
    }
  );
}
__name(ResizablePanelGroup, "ResizablePanelGroup");
function ResizablePanel({ className, ...props }) {
  return /* @__PURE__ */ jsx67(Panel, { "data-slot": "resizable-panel", className: cn(className), ...props });
}
__name(ResizablePanel, "ResizablePanel");
var ResizableHandle = React37.forwardRef(({ className, withHandle = false, ...props }, ref) => {
  return /* @__PURE__ */ jsx67(
    Separator6,
    {
      elementRef: ref,
      "data-slot": "resizable-handle",
      className: cn(
        "relative flex items-center justify-center bg-border",
        // react-resizable-panels sets `data-orientation` on Separator
        "data-[orientation=vertical]:w-px data-[orientation=vertical]:h-full",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        className
      ),
      ...props,
      children: withHandle ? /* @__PURE__ */ jsx67(
        "div",
        {
          "data-slot": "resizable-handle-grip",
          className: cn(
            "z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-card",
            "data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-4"
          ),
          children: /* @__PURE__ */ jsx67(
            GripVertical,
            {
              className: cn(
                "h-3 w-3 text-muted-foreground",
                "data-[orientation=horizontal]:rotate-90"
              ),
              "aria-hidden": true
            }
          )
        }
      ) : null
    }
  );
});
ResizableHandle.displayName = "ResizableHandle";

// components/ui/typography.tsx
import { jsx as jsx68 } from "react/jsx-runtime";
function Text({
  variant = "default",
  className,
  as: Component = "p",
  ...props
}) {
  return /* @__PURE__ */ jsx68(
    Component,
    {
      "data-slot": "text",
      "data-variant": variant,
      className: cn(
        "text-sm text-foreground",
        variant === "lead" && "text-base text-muted-foreground",
        variant === "small" && "text-xs text-foreground",
        variant === "muted" && "text-sm text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
__name(Text, "Text");
var headingClasses = {
  1: "text-3xl font-bold tracking-tight sm:text-4xl",
  2: "text-2xl font-semibold tracking-tight sm:text-3xl",
  3: "text-xl font-semibold tracking-tight sm:text-2xl",
  4: "text-lg font-semibold",
  5: "text-base font-semibold",
  6: "text-sm font-semibold"
};
function Heading({
  level = 1,
  className,
  as,
  ...props
}) {
  const Tag = as ?? `h${level}`;
  return /* @__PURE__ */ jsx68(
    Tag,
    {
      "data-slot": "heading",
      "data-level": level,
      className: cn("text-foreground", headingClasses[level], className),
      ...props
    }
  );
}
__name(Heading, "Heading");
function Lead({ className, ...props }) {
  return /* @__PURE__ */ jsx68(
    "p",
    {
      "data-slot": "lead",
      className: cn("text-base text-muted-foreground", className),
      ...props
    }
  );
}
__name(Lead, "Lead");
function Small({ className, ...props }) {
  return /* @__PURE__ */ jsx68(
    "span",
    {
      "data-slot": "small",
      className: cn("text-xs text-foreground", className),
      ...props
    }
  );
}
__name(Small, "Small");
function Muted({ className, ...props }) {
  return /* @__PURE__ */ jsx68(
    "span",
    {
      "data-slot": "muted",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
__name(Muted, "Muted");

// components/ui/toggle.tsx
import * as React38 from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { jsx as jsx69 } from "react/jsx-runtime";
var toggleVariants = createVariants({
  base: 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-foreground',
  variants: {
    variant: {
      default: "bg-transparent border border-transparent",
      outline: "border border-input bg-transparent"
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10"
    },
    activeVariant: {
      primary: "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
      secondary: "data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground",
      tertiary: "data-[state=on]:bg-tertiary data-[state=on]:text-tertiary-foreground"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    activeVariant: "primary"
  }
});
var Toggle = React38.forwardRef(({ className, variant = "default", size = "default", activeVariant = "primary", ...props }, ref) => {
  return /* @__PURE__ */ jsx69(
    TogglePrimitive.Root,
    {
      ref,
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size, activeVariant }), className),
      ...props
    }
  );
});
Toggle.displayName = "Toggle";

// components/ui/sonner.tsx
import { useTheme as useTheme3 } from "next-themes";

// ../../node_modules/.pnpm/sonner@2.0.7_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/sonner/dist/index.mjs
import React39 from "react";
import ReactDOM from "react-dom";
function __insertCSS(code) {
  if (!code || typeof document == "undefined") return;
  let head = document.head || document.getElementsByTagName("head")[0];
  let style = document.createElement("style");
  style.type = "text/css";
  head.appendChild(style);
  style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
__name(__insertCSS, "__insertCSS");
var getAsset = /* @__PURE__ */ __name((type) => {
  switch (type) {
    case "success":
      return SuccessIcon;
    case "info":
      return InfoIcon;
    case "warning":
      return WarningIcon;
    case "error":
      return ErrorIcon;
    default:
      return null;
  }
}, "getAsset");
var bars = Array(12).fill(0);
var Loader = /* @__PURE__ */ __name(({ visible, className }) => {
  return /* @__PURE__ */ React39.createElement("div", {
    className: [
      "sonner-loading-wrapper",
      className
    ].filter(Boolean).join(" "),
    "data-visible": visible
  }, /* @__PURE__ */ React39.createElement("div", {
    className: "sonner-spinner"
  }, bars.map((_, i) => /* @__PURE__ */ React39.createElement("div", {
    className: "sonner-loading-bar",
    key: `spinner-bar-${i}`
  }))));
}, "Loader");
var SuccessIcon = /* @__PURE__ */ React39.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ React39.createElement("path", {
  fillRule: "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  clipRule: "evenodd"
}));
var WarningIcon = /* @__PURE__ */ React39.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ React39.createElement("path", {
  fillRule: "evenodd",
  d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
  clipRule: "evenodd"
}));
var InfoIcon = /* @__PURE__ */ React39.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ React39.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
  clipRule: "evenodd"
}));
var ErrorIcon = /* @__PURE__ */ React39.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  height: "20",
  width: "20"
}, /* @__PURE__ */ React39.createElement("path", {
  fillRule: "evenodd",
  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
  clipRule: "evenodd"
}));
var CloseIcon = /* @__PURE__ */ React39.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /* @__PURE__ */ React39.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /* @__PURE__ */ React39.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
var useIsDocumentHidden = /* @__PURE__ */ __name(() => {
  const [isDocumentHidden, setIsDocumentHidden] = React39.useState(document.hidden);
  React39.useEffect(() => {
    const callback = /* @__PURE__ */ __name(() => {
      setIsDocumentHidden(document.hidden);
    }, "callback");
    document.addEventListener("visibilitychange", callback);
    return () => window.removeEventListener("visibilitychange", callback);
  }, []);
  return isDocumentHidden;
}, "useIsDocumentHidden");
var toastsCounter = 1;
var Observer = class {
  static {
    __name(this, "Observer");
  }
  constructor() {
    this.subscribe = (subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index, 1);
      };
    };
    this.publish = (data) => {
      this.subscribers.forEach((subscriber) => subscriber(data));
    };
    this.addToast = (data) => {
      this.publish(data);
      this.toasts = [
        ...this.toasts,
        data
      ];
    };
    this.create = (data) => {
      var _data_id;
      const { message: message2, ...rest } = data;
      const id = typeof (data == null ? void 0 : data.id) === "number" || ((_data_id = data.id) == null ? void 0 : _data_id.length) > 0 ? data.id : toastsCounter++;
      const alreadyExists = this.toasts.find((toast2) => {
        return toast2.id === id;
      });
      const dismissible = data.dismissible === void 0 ? true : data.dismissible;
      if (this.dismissedToasts.has(id)) {
        this.dismissedToasts.delete(id);
      }
      if (alreadyExists) {
        this.toasts = this.toasts.map((toast2) => {
          if (toast2.id === id) {
            this.publish({
              ...toast2,
              ...data,
              id,
              title: message2
            });
            return {
              ...toast2,
              ...data,
              id,
              dismissible,
              title: message2
            };
          }
          return toast2;
        });
      } else {
        this.addToast({
          title: message2,
          ...rest,
          dismissible,
          id
        });
      }
      return id;
    };
    this.dismiss = (id) => {
      if (id) {
        this.dismissedToasts.add(id);
        requestAnimationFrame(() => this.subscribers.forEach((subscriber) => subscriber({
          id,
          dismiss: true
        })));
      } else {
        this.toasts.forEach((toast2) => {
          this.subscribers.forEach((subscriber) => subscriber({
            id: toast2.id,
            dismiss: true
          }));
        });
      }
      return id;
    };
    this.message = (message2, data) => {
      return this.create({
        ...data,
        message: message2
      });
    };
    this.error = (message2, data) => {
      return this.create({
        ...data,
        message: message2,
        type: "error"
      });
    };
    this.success = (message2, data) => {
      return this.create({
        ...data,
        type: "success",
        message: message2
      });
    };
    this.info = (message2, data) => {
      return this.create({
        ...data,
        type: "info",
        message: message2
      });
    };
    this.warning = (message2, data) => {
      return this.create({
        ...data,
        type: "warning",
        message: message2
      });
    };
    this.loading = (message2, data) => {
      return this.create({
        ...data,
        type: "loading",
        message: message2
      });
    };
    this.promise = (promise, data) => {
      if (!data) {
        return;
      }
      let id = void 0;
      if (data.loading !== void 0) {
        id = this.create({
          ...data,
          promise,
          type: "loading",
          message: data.loading,
          description: typeof data.description !== "function" ? data.description : void 0
        });
      }
      const p = Promise.resolve(promise instanceof Function ? promise() : promise);
      let shouldDismiss = id !== void 0;
      let result;
      const originalPromise = p.then(async (response) => {
        result = [
          "resolve",
          response
        ];
        const isReactElementResponse = React39.isValidElement(response);
        if (isReactElementResponse) {
          shouldDismiss = false;
          this.create({
            id,
            type: "default",
            message: response
          });
        } else if (isHttpResponse(response) && !response.ok) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
          const description = typeof data.description === "function" ? await data.description(`HTTP error! status: ${response.status}`) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React39.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (response instanceof Error) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(response) : data.error;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React39.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        } else if (data.success !== void 0) {
          shouldDismiss = false;
          const promiseData = typeof data.success === "function" ? await data.success(response) : data.success;
          const description = typeof data.description === "function" ? await data.description(response) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React39.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "success",
            description,
            ...toastSettings
          });
        }
      }).catch(async (error) => {
        result = [
          "reject",
          error
        ];
        if (data.error !== void 0) {
          shouldDismiss = false;
          const promiseData = typeof data.error === "function" ? await data.error(error) : data.error;
          const description = typeof data.description === "function" ? await data.description(error) : data.description;
          const isExtendedResult = typeof promiseData === "object" && !React39.isValidElement(promiseData);
          const toastSettings = isExtendedResult ? promiseData : {
            message: promiseData
          };
          this.create({
            id,
            type: "error",
            description,
            ...toastSettings
          });
        }
      }).finally(() => {
        if (shouldDismiss) {
          this.dismiss(id);
          id = void 0;
        }
        data.finally == null ? void 0 : data.finally.call(data);
      });
      const unwrap = /* @__PURE__ */ __name(() => new Promise((resolve, reject) => originalPromise.then(() => result[0] === "reject" ? reject(result[1]) : resolve(result[1])).catch(reject)), "unwrap");
      if (typeof id !== "string" && typeof id !== "number") {
        return {
          unwrap
        };
      } else {
        return Object.assign(id, {
          unwrap
        });
      }
    };
    this.custom = (jsx84, data) => {
      const id = (data == null ? void 0 : data.id) || toastsCounter++;
      this.create({
        jsx: jsx84(id),
        id,
        ...data
      });
      return id;
    };
    this.getActiveToasts = () => {
      return this.toasts.filter((toast2) => !this.dismissedToasts.has(toast2.id));
    };
    this.subscribers = [];
    this.toasts = [];
    this.dismissedToasts = /* @__PURE__ */ new Set();
  }
};
var ToastState = new Observer();
var toastFunction = /* @__PURE__ */ __name((message2, data) => {
  const id = (data == null ? void 0 : data.id) || toastsCounter++;
  ToastState.addToast({
    title: message2,
    ...data,
    id
  });
  return id;
}, "toastFunction");
var isHttpResponse = /* @__PURE__ */ __name((data) => {
  return data && typeof data === "object" && "ok" in data && typeof data.ok === "boolean" && "status" in data && typeof data.status === "number";
}, "isHttpResponse");
var basicToast = toastFunction;
var getHistory = /* @__PURE__ */ __name(() => ToastState.toasts, "getHistory");
var getToasts = /* @__PURE__ */ __name(() => ToastState.getActiveToasts(), "getToasts");
var toast = Object.assign(basicToast, {
  success: ToastState.success,
  info: ToastState.info,
  warning: ToastState.warning,
  error: ToastState.error,
  custom: ToastState.custom,
  message: ToastState.message,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  loading: ToastState.loading
}, {
  getHistory,
  getToasts
});
__insertCSS("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function isAction(action) {
  return action.label !== void 0;
}
__name(isAction, "isAction");
var VISIBLE_TOASTS_AMOUNT = 3;
var VIEWPORT_OFFSET = "24px";
var MOBILE_VIEWPORT_OFFSET = "16px";
var TOAST_LIFETIME = 4e3;
var TOAST_WIDTH = 356;
var GAP = 14;
var SWIPE_THRESHOLD = 45;
var TIME_BEFORE_UNMOUNT = 200;
function cn2(...classes) {
  return classes.filter(Boolean).join(" ");
}
__name(cn2, "cn");
function getDefaultSwipeDirections(position) {
  const [y, x] = position.split("-");
  const directions = [];
  if (y) {
    directions.push(y);
  }
  if (x) {
    directions.push(x);
  }
  return directions;
}
__name(getDefaultSwipeDirections, "getDefaultSwipeDirections");
var Toast = /* @__PURE__ */ __name((props) => {
  var _toast_classNames, _toast_classNames1, _toast_classNames2, _toast_classNames3, _toast_classNames4, _toast_classNames5, _toast_classNames6, _toast_classNames7, _toast_classNames8;
  const { invert: ToasterInvert, toast: toast2, unstyled, interacting, setHeights, visibleToasts, heights, index, toasts, expanded, removeToast, defaultRichColors, closeButton: closeButtonFromToaster, style, cancelButtonStyle, actionButtonStyle, className = "", descriptionClassName = "", duration: durationFromToaster, position, gap, expandByDefault, classNames, icons, closeButtonAriaLabel = "Close toast" } = props;
  const [swipeDirection, setSwipeDirection] = React39.useState(null);
  const [swipeOutDirection, setSwipeOutDirection] = React39.useState(null);
  const [mounted, setMounted] = React39.useState(false);
  const [removed, setRemoved] = React39.useState(false);
  const [swiping, setSwiping] = React39.useState(false);
  const [swipeOut, setSwipeOut] = React39.useState(false);
  const [isSwiped, setIsSwiped] = React39.useState(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = React39.useState(0);
  const [initialHeight, setInitialHeight] = React39.useState(0);
  const remainingTime = React39.useRef(toast2.duration || durationFromToaster || TOAST_LIFETIME);
  const dragStartTime = React39.useRef(null);
  const toastRef = React39.useRef(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const toastType = toast2.type;
  const dismissible = toast2.dismissible !== false;
  const toastClassname = toast2.className || "";
  const toastDescriptionClassname = toast2.descriptionClassName || "";
  const heightIndex = React39.useMemo(() => heights.findIndex((height) => height.toastId === toast2.id) || 0, [
    heights,
    toast2.id
  ]);
  const closeButton = React39.useMemo(() => {
    var _toast_closeButton;
    return (_toast_closeButton = toast2.closeButton) != null ? _toast_closeButton : closeButtonFromToaster;
  }, [
    toast2.closeButton,
    closeButtonFromToaster
  ]);
  const duration = React39.useMemo(() => toast2.duration || durationFromToaster || TOAST_LIFETIME, [
    toast2.duration,
    durationFromToaster
  ]);
  const closeTimerStartTimeRef = React39.useRef(0);
  const offset = React39.useRef(0);
  const lastCloseTimerStartTimeRef = React39.useRef(0);
  const pointerStartRef = React39.useRef(null);
  const [y, x] = position.split("-");
  const toastsHeightBefore = React39.useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      if (reducerIndex >= heightIndex) {
        return prev;
      }
      return prev + curr.height;
    }, 0);
  }, [
    heights,
    heightIndex
  ]);
  const isDocumentHidden = useIsDocumentHidden();
  const invert = toast2.invert || ToasterInvert;
  const disabled = toastType === "loading";
  offset.current = React39.useMemo(() => heightIndex * gap + toastsHeightBefore, [
    heightIndex,
    toastsHeightBefore
  ]);
  React39.useEffect(() => {
    remainingTime.current = duration;
  }, [
    duration
  ]);
  React39.useEffect(() => {
    setMounted(true);
  }, []);
  React39.useEffect(() => {
    const toastNode = toastRef.current;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;
      setInitialHeight(height);
      setHeights((h) => [
        {
          toastId: toast2.id,
          height,
          position: toast2.position
        },
        ...h
      ]);
      return () => setHeights((h) => h.filter((height2) => height2.toastId !== toast2.id));
    }
  }, [
    setHeights,
    toast2.id
  ]);
  React39.useLayoutEffect(() => {
    if (!mounted) return;
    const toastNode = toastRef.current;
    const originalHeight = toastNode.style.height;
    toastNode.style.height = "auto";
    const newHeight = toastNode.getBoundingClientRect().height;
    toastNode.style.height = originalHeight;
    setInitialHeight(newHeight);
    setHeights((heights2) => {
      const alreadyExists = heights2.find((height) => height.toastId === toast2.id);
      if (!alreadyExists) {
        return [
          {
            toastId: toast2.id,
            height: newHeight,
            position: toast2.position
          },
          ...heights2
        ];
      } else {
        return heights2.map((height) => height.toastId === toast2.id ? {
          ...height,
          height: newHeight
        } : height);
      }
    });
  }, [
    mounted,
    toast2.title,
    toast2.description,
    setHeights,
    toast2.id,
    toast2.jsx,
    toast2.action,
    toast2.cancel
  ]);
  const deleteToast = React39.useCallback(() => {
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights((h) => h.filter((height) => height.toastId !== toast2.id));
    setTimeout(() => {
      removeToast(toast2);
    }, TIME_BEFORE_UNMOUNT);
  }, [
    toast2,
    removeToast,
    setHeights,
    offset
  ]);
  React39.useEffect(() => {
    if (toast2.promise && toastType === "loading" || toast2.duration === Infinity || toast2.type === "loading") return;
    let timeoutId;
    const pauseTimer = /* @__PURE__ */ __name(() => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - closeTimerStartTimeRef.current;
        remainingTime.current = remainingTime.current - elapsedTime;
      }
      lastCloseTimerStartTimeRef.current = (/* @__PURE__ */ new Date()).getTime();
    }, "pauseTimer");
    const startTimer = /* @__PURE__ */ __name(() => {
      if (remainingTime.current === Infinity) return;
      closeTimerStartTimeRef.current = (/* @__PURE__ */ new Date()).getTime();
      timeoutId = setTimeout(() => {
        toast2.onAutoClose == null ? void 0 : toast2.onAutoClose.call(toast2, toast2);
        deleteToast();
      }, remainingTime.current);
    }, "startTimer");
    if (expanded || interacting || isDocumentHidden) {
      pauseTimer();
    } else {
      startTimer();
    }
    return () => clearTimeout(timeoutId);
  }, [
    expanded,
    interacting,
    toast2,
    toastType,
    isDocumentHidden,
    deleteToast
  ]);
  React39.useEffect(() => {
    if (toast2.delete) {
      deleteToast();
      toast2.onDismiss == null ? void 0 : toast2.onDismiss.call(toast2, toast2);
    }
  }, [
    deleteToast,
    toast2.delete
  ]);
  function getLoadingIcon() {
    var _toast_classNames9;
    if (icons == null ? void 0 : icons.loading) {
      var _toast_classNames12;
      return /* @__PURE__ */ React39.createElement("div", {
        className: cn2(classNames == null ? void 0 : classNames.loader, toast2 == null ? void 0 : (_toast_classNames12 = toast2.classNames) == null ? void 0 : _toast_classNames12.loader, "sonner-loader"),
        "data-visible": toastType === "loading"
      }, icons.loading);
    }
    return /* @__PURE__ */ React39.createElement(Loader, {
      className: cn2(classNames == null ? void 0 : classNames.loader, toast2 == null ? void 0 : (_toast_classNames9 = toast2.classNames) == null ? void 0 : _toast_classNames9.loader),
      visible: toastType === "loading"
    });
  }
  __name(getLoadingIcon, "getLoadingIcon");
  const icon = toast2.icon || (icons == null ? void 0 : icons[toastType]) || getAsset(toastType);
  var _toast_richColors, _icons_close;
  return /* @__PURE__ */ React39.createElement("li", {
    tabIndex: 0,
    ref: toastRef,
    className: cn2(className, toastClassname, classNames == null ? void 0 : classNames.toast, toast2 == null ? void 0 : (_toast_classNames = toast2.classNames) == null ? void 0 : _toast_classNames.toast, classNames == null ? void 0 : classNames.default, classNames == null ? void 0 : classNames[toastType], toast2 == null ? void 0 : (_toast_classNames1 = toast2.classNames) == null ? void 0 : _toast_classNames1[toastType]),
    "data-sonner-toast": "",
    "data-rich-colors": (_toast_richColors = toast2.richColors) != null ? _toast_richColors : defaultRichColors,
    "data-styled": !Boolean(toast2.jsx || toast2.unstyled || unstyled),
    "data-mounted": mounted,
    "data-promise": Boolean(toast2.promise),
    "data-swiped": isSwiped,
    "data-removed": removed,
    "data-visible": isVisible,
    "data-y-position": y,
    "data-x-position": x,
    "data-index": index,
    "data-front": isFront,
    "data-swiping": swiping,
    "data-dismissible": dismissible,
    "data-type": toastType,
    "data-invert": invert,
    "data-swipe-out": swipeOut,
    "data-swipe-direction": swipeOutDirection,
    "data-expanded": Boolean(expanded || expandByDefault && mounted),
    "data-testid": toast2.testId,
    style: {
      "--index": index,
      "--toasts-before": index,
      "--z-index": toasts.length - index,
      "--offset": `${removed ? offsetBeforeRemove : offset.current}px`,
      "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`,
      ...style,
      ...toast2.style
    },
    onDragEnd: /* @__PURE__ */ __name(() => {
      setSwiping(false);
      setSwipeDirection(null);
      pointerStartRef.current = null;
    }, "onDragEnd"),
    onPointerDown: /* @__PURE__ */ __name((event) => {
      if (event.button === 2) return;
      if (disabled || !dismissible) return;
      dragStartTime.current = /* @__PURE__ */ new Date();
      setOffsetBeforeRemove(offset.current);
      event.target.setPointerCapture(event.pointerId);
      if (event.target.tagName === "BUTTON") return;
      setSwiping(true);
      pointerStartRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    }, "onPointerDown"),
    onPointerUp: /* @__PURE__ */ __name(() => {
      var _toastRef_current, _toastRef_current1, _dragStartTime_current;
      if (swipeOut || !dismissible) return;
      pointerStartRef.current = null;
      const swipeAmountX = Number(((_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0);
      const swipeAmountY = Number(((_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0);
      const timeTaken = (/* @__PURE__ */ new Date()).getTime() - ((_dragStartTime_current = dragStartTime.current) == null ? void 0 : _dragStartTime_current.getTime());
      const swipeAmount = swipeDirection === "x" ? swipeAmountX : swipeAmountY;
      const velocity = Math.abs(swipeAmount) / timeTaken;
      if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
        setOffsetBeforeRemove(offset.current);
        toast2.onDismiss == null ? void 0 : toast2.onDismiss.call(toast2, toast2);
        if (swipeDirection === "x") {
          setSwipeOutDirection(swipeAmountX > 0 ? "right" : "left");
        } else {
          setSwipeOutDirection(swipeAmountY > 0 ? "down" : "up");
        }
        deleteToast();
        setSwipeOut(true);
        return;
      } else {
        var _toastRef_current2, _toastRef_current3;
        (_toastRef_current2 = toastRef.current) == null ? void 0 : _toastRef_current2.style.setProperty("--swipe-amount-x", `0px`);
        (_toastRef_current3 = toastRef.current) == null ? void 0 : _toastRef_current3.style.setProperty("--swipe-amount-y", `0px`);
      }
      setIsSwiped(false);
      setSwiping(false);
      setSwipeDirection(null);
    }, "onPointerUp"),
    onPointerMove: /* @__PURE__ */ __name((event) => {
      var _window_getSelection, _toastRef_current, _toastRef_current1;
      if (!pointerStartRef.current || !dismissible) return;
      const isHighlighted = ((_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString().length) > 0;
      if (isHighlighted) return;
      const yDelta = event.clientY - pointerStartRef.current.y;
      const xDelta = event.clientX - pointerStartRef.current.x;
      var _props_swipeDirections;
      const swipeDirections = (_props_swipeDirections = props.swipeDirections) != null ? _props_swipeDirections : getDefaultSwipeDirections(position);
      if (!swipeDirection && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) {
        setSwipeDirection(Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y");
      }
      let swipeAmount = {
        x: 0,
        y: 0
      };
      const getDampening = /* @__PURE__ */ __name((delta) => {
        const factor = Math.abs(delta) / 20;
        return 1 / (1.5 + factor);
      }, "getDampening");
      if (swipeDirection === "y") {
        if (swipeDirections.includes("top") || swipeDirections.includes("bottom")) {
          if (swipeDirections.includes("top") && yDelta < 0 || swipeDirections.includes("bottom") && yDelta > 0) {
            swipeAmount.y = yDelta;
          } else {
            const dampenedDelta = yDelta * getDampening(yDelta);
            swipeAmount.y = Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta;
          }
        }
      } else if (swipeDirection === "x") {
        if (swipeDirections.includes("left") || swipeDirections.includes("right")) {
          if (swipeDirections.includes("left") && xDelta < 0 || swipeDirections.includes("right") && xDelta > 0) {
            swipeAmount.x = xDelta;
          } else {
            const dampenedDelta = xDelta * getDampening(xDelta);
            swipeAmount.x = Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta;
          }
        }
      }
      if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) {
        setIsSwiped(true);
      }
      (_toastRef_current = toastRef.current) == null ? void 0 : _toastRef_current.style.setProperty("--swipe-amount-x", `${swipeAmount.x}px`);
      (_toastRef_current1 = toastRef.current) == null ? void 0 : _toastRef_current1.style.setProperty("--swipe-amount-y", `${swipeAmount.y}px`);
    }, "onPointerMove")
  }, closeButton && !toast2.jsx && toastType !== "loading" ? /* @__PURE__ */ React39.createElement("button", {
    "aria-label": closeButtonAriaLabel,
    "data-disabled": disabled,
    "data-close-button": true,
    onClick: disabled || !dismissible ? () => {
    } : () => {
      deleteToast();
      toast2.onDismiss == null ? void 0 : toast2.onDismiss.call(toast2, toast2);
    },
    className: cn2(classNames == null ? void 0 : classNames.closeButton, toast2 == null ? void 0 : (_toast_classNames2 = toast2.classNames) == null ? void 0 : _toast_classNames2.closeButton)
  }, (_icons_close = icons == null ? void 0 : icons.close) != null ? _icons_close : CloseIcon) : null, (toastType || toast2.icon || toast2.promise) && toast2.icon !== null && ((icons == null ? void 0 : icons[toastType]) !== null || toast2.icon) ? /* @__PURE__ */ React39.createElement("div", {
    "data-icon": "",
    className: cn2(classNames == null ? void 0 : classNames.icon, toast2 == null ? void 0 : (_toast_classNames3 = toast2.classNames) == null ? void 0 : _toast_classNames3.icon)
  }, toast2.promise || toast2.type === "loading" && !toast2.icon ? toast2.icon || getLoadingIcon() : null, toast2.type !== "loading" ? icon : null) : null, /* @__PURE__ */ React39.createElement("div", {
    "data-content": "",
    className: cn2(classNames == null ? void 0 : classNames.content, toast2 == null ? void 0 : (_toast_classNames4 = toast2.classNames) == null ? void 0 : _toast_classNames4.content)
  }, /* @__PURE__ */ React39.createElement("div", {
    "data-title": "",
    className: cn2(classNames == null ? void 0 : classNames.title, toast2 == null ? void 0 : (_toast_classNames5 = toast2.classNames) == null ? void 0 : _toast_classNames5.title)
  }, toast2.jsx ? toast2.jsx : typeof toast2.title === "function" ? toast2.title() : toast2.title), toast2.description ? /* @__PURE__ */ React39.createElement("div", {
    "data-description": "",
    className: cn2(descriptionClassName, toastDescriptionClassname, classNames == null ? void 0 : classNames.description, toast2 == null ? void 0 : (_toast_classNames6 = toast2.classNames) == null ? void 0 : _toast_classNames6.description)
  }, typeof toast2.description === "function" ? toast2.description() : toast2.description) : null), /* @__PURE__ */ React39.isValidElement(toast2.cancel) ? toast2.cancel : toast2.cancel && isAction(toast2.cancel) ? /* @__PURE__ */ React39.createElement("button", {
    "data-button": true,
    "data-cancel": true,
    style: toast2.cancelButtonStyle || cancelButtonStyle,
    onClick: /* @__PURE__ */ __name((event) => {
      if (!isAction(toast2.cancel)) return;
      if (!dismissible) return;
      toast2.cancel.onClick == null ? void 0 : toast2.cancel.onClick.call(toast2.cancel, event);
      deleteToast();
    }, "onClick"),
    className: cn2(classNames == null ? void 0 : classNames.cancelButton, toast2 == null ? void 0 : (_toast_classNames7 = toast2.classNames) == null ? void 0 : _toast_classNames7.cancelButton)
  }, toast2.cancel.label) : null, /* @__PURE__ */ React39.isValidElement(toast2.action) ? toast2.action : toast2.action && isAction(toast2.action) ? /* @__PURE__ */ React39.createElement("button", {
    "data-button": true,
    "data-action": true,
    style: toast2.actionButtonStyle || actionButtonStyle,
    onClick: /* @__PURE__ */ __name((event) => {
      if (!isAction(toast2.action)) return;
      toast2.action.onClick == null ? void 0 : toast2.action.onClick.call(toast2.action, event);
      if (event.defaultPrevented) return;
      deleteToast();
    }, "onClick"),
    className: cn2(classNames == null ? void 0 : classNames.actionButton, toast2 == null ? void 0 : (_toast_classNames8 = toast2.classNames) == null ? void 0 : _toast_classNames8.actionButton)
  }, toast2.action.label) : null);
}, "Toast");
function getDocumentDirection() {
  if (typeof window === "undefined") return "ltr";
  if (typeof document === "undefined") return "ltr";
  const dirAttribute = document.documentElement.getAttribute("dir");
  if (dirAttribute === "auto" || !dirAttribute) {
    return window.getComputedStyle(document.documentElement).direction;
  }
  return dirAttribute;
}
__name(getDocumentDirection, "getDocumentDirection");
function assignOffset(defaultOffset, mobileOffset) {
  const styles = {};
  [
    defaultOffset,
    mobileOffset
  ].forEach((offset, index) => {
    const isMobile = index === 1;
    const prefix = isMobile ? "--mobile-offset" : "--offset";
    const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
    function assignAll(offset2) {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((key) => {
        styles[`${prefix}-${key}`] = typeof offset2 === "number" ? `${offset2}px` : offset2;
      });
    }
    __name(assignAll, "assignAll");
    if (typeof offset === "number" || typeof offset === "string") {
      assignAll(offset);
    } else if (typeof offset === "object") {
      [
        "top",
        "right",
        "bottom",
        "left"
      ].forEach((key) => {
        if (offset[key] === void 0) {
          styles[`${prefix}-${key}`] = defaultValue;
        } else {
          styles[`${prefix}-${key}`] = typeof offset[key] === "number" ? `${offset[key]}px` : offset[key];
        }
      });
    } else {
      assignAll(defaultValue);
    }
  });
  return styles;
}
__name(assignOffset, "assignOffset");
var Toaster = /* @__PURE__ */ React39.forwardRef(/* @__PURE__ */ __name(function Toaster2(props, ref) {
  const { id, invert, position = "bottom-right", hotkey = [
    "altKey",
    "KeyT"
  ], expand, closeButton, className, offset, mobileOffset, theme = "light", richColors, duration, style, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions, dir = getDocumentDirection(), gap = GAP, icons, containerAriaLabel = "Notifications" } = props;
  const [toasts, setToasts] = React39.useState([]);
  const filteredToasts = React39.useMemo(() => {
    if (id) {
      return toasts.filter((toast2) => toast2.toasterId === id);
    }
    return toasts.filter((toast2) => !toast2.toasterId);
  }, [
    toasts,
    id
  ]);
  const possiblePositions = React39.useMemo(() => {
    return Array.from(new Set([
      position
    ].concat(filteredToasts.filter((toast2) => toast2.position).map((toast2) => toast2.position))));
  }, [
    filteredToasts,
    position
  ]);
  const [heights, setHeights] = React39.useState([]);
  const [expanded, setExpanded] = React39.useState(false);
  const [interacting, setInteracting] = React39.useState(false);
  const [actualTheme, setActualTheme] = React39.useState(theme !== "system" ? theme : typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : "light");
  const listRef = React39.useRef(null);
  const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "");
  const lastFocusedElementRef = React39.useRef(null);
  const isFocusWithinRef = React39.useRef(false);
  const removeToast = React39.useCallback((toastToRemove) => {
    setToasts((toasts2) => {
      var _toasts_find;
      if (!((_toasts_find = toasts2.find((toast2) => toast2.id === toastToRemove.id)) == null ? void 0 : _toasts_find.delete)) {
        ToastState.dismiss(toastToRemove.id);
      }
      return toasts2.filter(({ id: id2 }) => id2 !== toastToRemove.id);
    });
  }, []);
  React39.useEffect(() => {
    return ToastState.subscribe((toast2) => {
      if (toast2.dismiss) {
        requestAnimationFrame(() => {
          setToasts((toasts2) => toasts2.map((t) => t.id === toast2.id ? {
            ...t,
            delete: true
          } : t));
        });
        return;
      }
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setToasts((toasts2) => {
            const indexOfExistingToast = toasts2.findIndex((t) => t.id === toast2.id);
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts2.slice(0, indexOfExistingToast),
                {
                  ...toasts2[indexOfExistingToast],
                  ...toast2
                },
                ...toasts2.slice(indexOfExistingToast + 1)
              ];
            }
            return [
              toast2,
              ...toasts2
            ];
          });
        });
      });
    });
  }, [
    toasts
  ]);
  React39.useEffect(() => {
    if (theme !== "system") {
      setActualTheme(theme);
      return;
    }
    if (theme === "system") {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setActualTheme("dark");
      } else {
        setActualTheme("light");
      }
    }
    if (typeof window === "undefined") return;
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      darkMediaQuery.addEventListener("change", ({ matches }) => {
        if (matches) {
          setActualTheme("dark");
        } else {
          setActualTheme("light");
        }
      });
    } catch (error) {
      darkMediaQuery.addListener(({ matches }) => {
        try {
          if (matches) {
            setActualTheme("dark");
          } else {
            setActualTheme("light");
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, [
    theme
  ]);
  React39.useEffect(() => {
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [
    toasts
  ]);
  React39.useEffect(() => {
    const handleKeyDown = /* @__PURE__ */ __name((event) => {
      var _listRef_current;
      const isHotkeyPressed = hotkey.every((key) => event[key] || event.code === key);
      if (isHotkeyPressed) {
        var _listRef_current1;
        setExpanded(true);
        (_listRef_current1 = listRef.current) == null ? void 0 : _listRef_current1.focus();
      }
      if (event.code === "Escape" && (document.activeElement === listRef.current || ((_listRef_current = listRef.current) == null ? void 0 : _listRef_current.contains(document.activeElement)))) {
        setExpanded(false);
      }
    }, "handleKeyDown");
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    hotkey
  ]);
  React39.useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({
            preventScroll: true
          });
          lastFocusedElementRef.current = null;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, [
    listRef.current
  ]);
  return (
    // Remove item from normal navigation flow, only available via hotkey
    /* @__PURE__ */ React39.createElement("section", {
      ref,
      "aria-label": `${containerAriaLabel} ${hotkeyLabel}`,
      tabIndex: -1,
      "aria-live": "polite",
      "aria-relevant": "additions text",
      "aria-atomic": "false",
      suppressHydrationWarning: true
    }, possiblePositions.map((position2, index) => {
      var _heights_;
      const [y, x] = position2.split("-");
      if (!filteredToasts.length) return null;
      return /* @__PURE__ */ React39.createElement("ol", {
        key: position2,
        dir: dir === "auto" ? getDocumentDirection() : dir,
        tabIndex: -1,
        ref: listRef,
        className,
        "data-sonner-toaster": true,
        "data-sonner-theme": actualTheme,
        "data-y-position": y,
        "data-x-position": x,
        style: {
          "--front-toast-height": `${((_heights_ = heights[0]) == null ? void 0 : _heights_.height) || 0}px`,
          "--width": `${TOAST_WIDTH}px`,
          "--gap": `${gap}px`,
          ...style,
          ...assignOffset(offset, mobileOffset)
        },
        onBlur: /* @__PURE__ */ __name((event) => {
          if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
            isFocusWithinRef.current = false;
            if (lastFocusedElementRef.current) {
              lastFocusedElementRef.current.focus({
                preventScroll: true
              });
              lastFocusedElementRef.current = null;
            }
          }
        }, "onBlur"),
        onFocus: /* @__PURE__ */ __name((event) => {
          const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
          if (isNotDismissible) return;
          if (!isFocusWithinRef.current) {
            isFocusWithinRef.current = true;
            lastFocusedElementRef.current = event.relatedTarget;
          }
        }, "onFocus"),
        onMouseEnter: /* @__PURE__ */ __name(() => setExpanded(true), "onMouseEnter"),
        onMouseMove: /* @__PURE__ */ __name(() => setExpanded(true), "onMouseMove"),
        onMouseLeave: /* @__PURE__ */ __name(() => {
          if (!interacting) {
            setExpanded(false);
          }
        }, "onMouseLeave"),
        onDragEnd: /* @__PURE__ */ __name(() => setExpanded(false), "onDragEnd"),
        onPointerDown: /* @__PURE__ */ __name((event) => {
          const isNotDismissible = event.target instanceof HTMLElement && event.target.dataset.dismissible === "false";
          if (isNotDismissible) return;
          setInteracting(true);
        }, "onPointerDown"),
        onPointerUp: /* @__PURE__ */ __name(() => setInteracting(false), "onPointerUp")
      }, filteredToasts.filter((toast2) => !toast2.position && index === 0 || toast2.position === position2).map((toast2, index2) => {
        var _toastOptions_duration, _toastOptions_closeButton;
        return /* @__PURE__ */ React39.createElement(Toast, {
          key: toast2.id,
          icons,
          index: index2,
          toast: toast2,
          defaultRichColors: richColors,
          duration: (_toastOptions_duration = toastOptions == null ? void 0 : toastOptions.duration) != null ? _toastOptions_duration : duration,
          className: toastOptions == null ? void 0 : toastOptions.className,
          descriptionClassName: toastOptions == null ? void 0 : toastOptions.descriptionClassName,
          invert,
          visibleToasts,
          closeButton: (_toastOptions_closeButton = toastOptions == null ? void 0 : toastOptions.closeButton) != null ? _toastOptions_closeButton : closeButton,
          interacting,
          position: position2,
          style: toastOptions == null ? void 0 : toastOptions.style,
          unstyled: toastOptions == null ? void 0 : toastOptions.unstyled,
          classNames: toastOptions == null ? void 0 : toastOptions.classNames,
          cancelButtonStyle: toastOptions == null ? void 0 : toastOptions.cancelButtonStyle,
          actionButtonStyle: toastOptions == null ? void 0 : toastOptions.actionButtonStyle,
          closeButtonAriaLabel: toastOptions == null ? void 0 : toastOptions.closeButtonAriaLabel,
          removeToast,
          toasts: filteredToasts.filter((t) => t.position == toast2.position),
          heights: heights.filter((h) => h.position == toast2.position),
          setHeights,
          expandByDefault: expand,
          gap,
          expanded,
          swipeDirections: props.swipeDirections
        });
      }));
    }))
  );
}, "Toaster"));

// components/ui/sonner.tsx
import { AlertTriangle, CheckCircle2, Info, Loader2 as Loader22, ServerCrash, X as X7 } from "lucide-react";
import { jsx as jsx70 } from "react/jsx-runtime";
function Toaster3(props) {
  const { theme = "system" } = useTheme3();
  const {
    className,
    toastOptions,
    offset,
    mobileOffset,
    gap,
    visibleToasts,
    richColors,
    closeButton,
    icons,
    variant = "default",
    ...rest
  } = props;
  const resolvedRichColors = richColors ?? (variant === "default" ? false : true);
  const colorVars = variant === "solid" ? [
    // Solid (filled)
    // Sonner defines its own defaults for these vars with fairly high specificity.
    // Use `!` so token values always win.
    // In solid style, border should be visually minimal (match Mindtris UI solid toasts).
    "![--success-bg:var(--success,var(--chart-2,var(--accent)))] ![--success-text:var(--primary-foreground)] ![--success-border:transparent]",
    "![--info-bg:var(--primary)] ![--info-text:var(--primary-foreground)] ![--info-border:transparent]",
    "![--warning-bg:var(--warning,var(--chart-3,var(--secondary)))] ![--warning-text:var(--primary-foreground)] ![--warning-border:transparent]",
    "![--error-bg:var(--destructive)] ![--error-text:var(--destructive-foreground)] ![--error-border:transparent]"
  ] : variant === "soft" ? [
    // Soft (tinted). Uses popover as the base surface.
    "![--success-bg:color-mix(in srgb, var(--success,var(--chart-2,var(--accent))) 18%, var(--popover))] ![--success-text:var(--foreground)] ![--success-border:var(--border)]",
    "![--info-bg:color-mix(in srgb, var(--primary) 18%, var(--popover))] ![--info-text:var(--foreground)] ![--info-border:var(--border)]",
    "![--warning-bg:color-mix(in srgb, var(--warning,var(--chart-3,var(--secondary))) 18%, var(--popover))] ![--warning-text:var(--foreground)] ![--warning-border:var(--border)]",
    "![--error-bg:color-mix(in srgb, var(--destructive) 12%, var(--popover))] ![--error-text:var(--foreground)] ![--error-border:var(--border)]"
  ] : [];
  return /* @__PURE__ */ jsx70(
    Toaster,
    {
      theme,
      richColors: resolvedRichColors,
      className: cn(
        "toaster group",
        // Trim placement from window (similar to Sheet inset).
        // Also set a sensible default width and max width for mobile.
        "[--width:min(24rem,calc(100vw-1rem))]",
        // Token-driven colors for Sonner's internal type backgrounds.
        "[--normal-bg:var(--popover)] [--normal-text:var(--popover-foreground)] [--normal-border:var(--border)]",
        colorVars,
        className
      ),
      offset: offset ?? 8,
      mobileOffset: mobileOffset ?? 8,
      gap: gap ?? 12,
      visibleToasts: visibleToasts ?? 3,
      closeButton,
      icons: {
        success: /* @__PURE__ */ jsx70(CheckCircle2, { className: "h-4 w-4", "aria-hidden": true }),
        info: /* @__PURE__ */ jsx70(Info, { className: "h-4 w-4", "aria-hidden": true }),
        warning: /* @__PURE__ */ jsx70(AlertTriangle, { className: "h-4 w-4", "aria-hidden": true }),
        error: /* @__PURE__ */ jsx70(ServerCrash, { className: "h-4 w-4", "aria-hidden": true }),
        loading: /* @__PURE__ */ jsx70(Loader22, { className: "h-4 w-4 animate-spin", "aria-hidden": true }),
        close: /* @__PURE__ */ jsx70(X7, { className: "h-4 w-4", "aria-hidden": true }),
        ...icons
      },
      toastOptions: {
        ...toastOptions,
        // Sonner has a fairly opinionated default layout (e.g. 16px padding).
        // If callers want unstyled, they can explicitly set it.
        // Default stays styled so Sonner layout/stacking behaves as expected.
        unstyled: toastOptions?.unstyled,
        classNames: {
          ...toastOptions?.classNames ?? {},
          toast: cn(
            // Base shell (token driven)
            "bg-popover text-popover-foreground border-border",
            "border shadow-lg rounded-xl",
            // Typography (use app font; readable sizing)
            "font-inherit",
            // Mindtris UI density (comfortable, not oversized).
            "text-sm font-normal leading-5",
            // Sonner renders title/description with data-attrs in the DOM.
            // Title should read as a label; description stays normal.
            "[&_[data-title]]:font-medium [&_[data-description]]:font-normal",
            // Spacing
            // Trim top/bottom padding (match Mindtris UI toast density).
            "!px-3 !py-2",
            // Layout
            "items-start gap-3"
            // Close button is inline (in-flow), no extra padding needed.
          ),
          // Keep toast text lightweight (avoid “thick” feel).
          // Match Mindtris UI notifications: title reads as a label with a small bottom gap.
          title: "font-inherit text-sm font-medium leading-5 text-foreground mb-1",
          // Match Mindtris UI notifications: body copy uses regular sizing and muted tone.
          description: "font-inherit text-sm font-normal leading-5 text-muted-foreground",
          // Let title's `mb-1` control spacing (no extra gap).
          content: "gap-0",
          // Match Mindtris UI guidance: icons can be hidden on mobile when needed.
          icon: "hidden sm:inline-flex",
          // Close button: inline on the right (not floating).
          closeButton: cn(
            // Override Sonner default absolute positioning (top corner).
            "!static !transform-none !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto",
            // Push to the right edge of the toast row.
            "ml-auto shrink-0",
            // Mindtris button-like styling.
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            "border border-border bg-card",
            "rounded-md",
            "h-7 w-7",
            "inline-flex items-center justify-center",
            "cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          ),
          actionButton: cn(
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90",
            "text-sm font-medium",
            "h-8 px-3 rounded-md"
          ),
          cancelButton: cn(
            "bg-secondary text-secondary-foreground border border-border",
            "hover:bg-secondary/90",
            "text-sm font-medium",
            "h-8 px-3 rounded-md"
          )
        }
      },
      ...rest
    }
  );
}
__name(Toaster3, "Toaster");
var semanticToastClassNames = {
  neutral: "bg-popover text-popover-foreground border-border",
  primary: "bg-primary text-primary-foreground border-border",
  secondary: "bg-secondary text-secondary-foreground border-border",
  tertiary: "bg-card text-foreground border-border",
  accent: "bg-accent text-accent-foreground border-border",
  muted: "bg-muted text-foreground border-border",
  foreground: "bg-foreground text-background border-foreground/40",
  destructive: "bg-destructive text-destructive-foreground border-destructive/40"
};
function toastSemantic(variant, message2, options) {
  const merged = options ? { ...options, className: cn(options.className) } : void 0;
  switch (variant) {
    case "success":
      return toast.success(message2, merged);
    case "info":
      return toast.info(message2, merged);
    case "warning":
      return toast.warning(message2, merged);
    case "error":
      return toast.error(message2, merged);
    default:
      return toast(message2, {
        ...options,
        className: cn(semanticToastClassNames[variant], options?.className)
      });
  }
}
__name(toastSemantic, "toastSemantic");

// components/ui/select-radix.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { CircleCheck as CircleCheck2, ChevronDown as ChevronDown7, ChevronUp as ChevronUp2 } from "lucide-react";
import { jsx as jsx71, jsxs as jsxs43 } from "react/jsx-runtime";
var SelectRoot = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs43(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm transition-colors",
        "border-foreground data-[placeholder]:border-input data-[placeholder]:text-muted-foreground",
        "text-foreground",
        "focus-visible:outline-none focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[size=default]:h-9 data-[size=sm]:h-8",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx71(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx71(ChevronDown7, { className: "h-4 w-4 text-muted-foreground", "aria-hidden": true }) })
      ]
    }
  );
}
__name(SelectTrigger, "SelectTrigger");
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx71(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs43(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      position,
      className: cn(
        "bg-popover text-popover-foreground border border-input",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md p-1",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx71(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx71(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx71(SelectScrollDownButton, {})
      ]
    }
  ) });
}
__name(SelectContent, "SelectContent");
function SelectLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx71(
    SelectPrimitive.Label,
    {
      "data-slot": "select-label",
      className: cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className),
      ...props
    }
  );
}
__name(SelectLabel, "SelectLabel");
function SelectItem({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs43(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none",
        "focus:bg-background focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx71("span", { className: "absolute right-2 flex h-3.5 w-3.5 shrink-0 items-center justify-center", children: /* @__PURE__ */ jsx71(SelectPrimitive.ItemIndicator, { className: "inline-flex", children: /* @__PURE__ */ jsx71(CircleCheck2, { className: "h-4 w-4 text-foreground", "aria-hidden": true }) }) }),
        /* @__PURE__ */ jsx71(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
__name(SelectItem, "SelectItem");
function SelectSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx71(
    SelectPrimitive.Separator,
    {
      "data-slot": "select-separator",
      className: cn("pointer-events-none -mx-1 my-1 h-px min-h-0 max-h-px shrink-0 bg-border/90", className),
      ...props
    }
  );
}
__name(SelectSeparator, "SelectSeparator");
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx71(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className),
      ...props,
      children: /* @__PURE__ */ jsx71(ChevronUp2, { className: "h-4 w-4", "aria-hidden": true })
    }
  );
}
__name(SelectScrollUpButton, "SelectScrollUpButton");
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx71(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1 text-muted-foreground", className),
      ...props,
      children: /* @__PURE__ */ jsx71(ChevronDown7, { className: "h-4 w-4", "aria-hidden": true })
    }
  );
}
__name(SelectScrollDownButton, "SelectScrollDownButton");

// components/ui/button-tooltip.tsx
import * as React40 from "react";
import { Transition as Transition2 } from "@headlessui/react";
import { jsx as jsx72, jsxs as jsxs44 } from "react/jsx-runtime";
function ButtonTooltip({
  children,
  content,
  position = "bottom",
  bg = "dark",
  size = "none",
  className,
  disabled = false
}) {
  const [tooltipOpen, setTooltipOpen] = React40.useState(false);
  const positionOuterClasses = /* @__PURE__ */ __name((pos) => {
    switch (pos) {
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2";
    }
  }, "positionOuterClasses");
  const positionInnerClasses = /* @__PURE__ */ __name((pos) => {
    switch (pos) {
      case "right":
        return "ml-2";
      case "left":
        return "mr-2";
      case "bottom":
        return "mt-2";
      default:
        return "mb-2";
    }
  }, "positionInnerClasses");
  const sizeClasses8 = /* @__PURE__ */ __name((s) => {
    switch (s) {
      case "lg":
        return "min-w-[18rem] px-3 py-2";
      case "md":
        return "min-w-[14rem] px-3 py-2";
      case "sm":
        return "min-w-[11rem] px-3 py-2";
      default:
        return "px-3 py-2";
    }
  }, "sizeClasses");
  const colorClasses = /* @__PURE__ */ __name((b) => {
    switch (b) {
      case "light":
        return "bg-popover text-popover-foreground border-border";
      case "dark":
        return "bg-foreground text-background border-border/60";
      default:
        return "bg-popover text-popover-foreground border-border";
    }
  }, "colorClasses");
  const getArrowElement = /* @__PURE__ */ __name(() => {
    if (position !== "bottom") return null;
    return /* @__PURE__ */ jsx72(
      "div",
      {
        className: cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1 w-2.5 h-2.5 rotate-45 border border-border",
          bg === "dark" ? "bg-foreground" : "bg-popover"
        )
      }
    );
  }, "getArrowElement");
  return /* @__PURE__ */ jsxs44(
    "div",
    {
      className: cn("relative inline-flex", className),
      onMouseEnter: () => !disabled && setTooltipOpen(true),
      onMouseLeave: () => setTooltipOpen(false),
      onFocus: () => !disabled && setTooltipOpen(true),
      onBlur: () => setTooltipOpen(false),
      children: [
        children,
        /* @__PURE__ */ jsx72("div", { className: cn("z-50 absolute pointer-events-none", positionOuterClasses(position)), children: /* @__PURE__ */ jsxs44(
          Transition2,
          {
            show: tooltipOpen && !disabled,
            as: "div",
            className: cn(
              "rounded-lg border overflow-visible shadow-lg whitespace-nowrap relative",
              sizeClasses8(size),
              colorClasses(bg),
              positionInnerClasses(position)
            ),
            enter: "transition ease-out duration-200 transform",
            enterFrom: "opacity-0 -translate-y-2",
            enterTo: "opacity-100 translate-y-0",
            leave: "transition ease-out duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            unmount: false,
            children: [
              getArrowElement(),
              content
            ]
          }
        ) })
      ]
    }
  );
}
__name(ButtonTooltip, "ButtonTooltip");
var Tooltip3 = ButtonTooltip;

// components/theme-customizer/theme-tab.tsx
import { Sun, Moon as Moon2, Upload, ExternalLink } from "lucide-react";

// components/theme-customizer/colors-panel.tsx
import React41 from "react";

// components/theme-customizer/color-input.tsx
import { jsx as jsx73, jsxs as jsxs45 } from "react/jsx-runtime";
function ColorInput({ label, cssVar, value, onChange, className }) {
  const swatchColor = value && value.trim() !== "" ? value : "transparent";
  const showBorder = !swatchColor || swatchColor === "transparent";
  const handleChange = /* @__PURE__ */ __name((e) => {
    onChange(cssVar, e.target.value);
  }, "handleChange");
  return /* @__PURE__ */ jsxs45("div", { className: cn("space-y-1.5", className), children: [
    /* @__PURE__ */ jsx73("label", { className: "text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxs45("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx73(
        "div",
        {
          className: "h-8 w-8 shrink-0 rounded-md border border-border bg-background overflow-hidden",
          title: value,
          children: /* @__PURE__ */ jsx73(
            "div",
            {
              className: "h-full w-full rounded-[calc(var(--radius)-1px)] border border-border",
              style: {
                background: swatchColor,
                borderColor: showBorder ? "var(--border)" : "transparent"
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsx73(
        Input,
        {
          type: "text",
          value,
          onChange: handleChange,
          className: "flex-1 min-w-0 text-xs font-mono",
          placeholder: "e.g. #755ff8",
          spellCheck: false
        }
      )
    ] })
  ] });
}
__name(ColorInput, "ColorInput");

// components/theme-customizer/colors-panel.tsx
import { jsx as jsx74, jsxs as jsxs46 } from "react/jsx-runtime";
function getComputedColorValues() {
  if (typeof document === "undefined") return {};
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const out = {};
  colorGroups.forEach((group) => {
    group.colors.forEach((c) => {
      const varName = c.cssVar.startsWith("--") ? c.cssVar : `--${c.cssVar}`;
      const value = styles.getPropertyValue(varName).trim();
      if (value) out[c.cssVar] = value;
    });
  });
  return out;
}
__name(getComputedColorValues, "getComputedColorValues");
function ColorsPanel({ selectedTheme, isDarkMode } = {}) {
  const { handleColorChange: handleColorChange2 } = useThemeManager();
  const [colorValues, setColorValues] = React41.useState({});
  const [validationErrors, setValidationErrors] = React41.useState({});
  const [openGroups, setOpenGroups] = React41.useState(() => {
    const o = {};
    colorGroups.forEach((g) => {
      o[g.title] = true;
    });
    return o;
  });
  const refreshValues = React41.useCallback(() => {
    setColorValues(getComputedColorValues());
  }, []);
  React41.useEffect(() => {
    refreshValues();
  }, [refreshValues, selectedTheme, isDarkMode]);
  const handleChange = React41.useCallback(
    (cssVar, value) => {
      const validation = validateColorValue(value);
      if (validation.isValid) {
        handleColorChange2(cssVar, value);
        setColorValues((prev) => ({ ...prev, [cssVar]: value }));
        setValidationErrors((prev) => {
          const next = { ...prev };
          delete next[cssVar];
          return next;
        });
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          [cssVar]: validation.error || "Invalid color value"
        }));
      }
    },
    [handleColorChange2]
  );
  const toggleGroup = /* @__PURE__ */ __name((title) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  }, "toggleGroup");
  return /* @__PURE__ */ jsx74("div", { className: "space-y-3 pt-5 pb-2", children: colorGroups.map((group) => /* @__PURE__ */ jsx74(
    CollapsibleSection,
    {
      title: group.title,
      open: openGroups[group.title] !== false,
      onToggle: () => toggleGroup(group.title),
      children: group.colors.map((color) => /* @__PURE__ */ jsxs46("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx74(
          ColorInput,
          {
            label: color.name,
            cssVar: color.cssVar,
            value: colorValues[color.cssVar] ?? "",
            onChange: handleChange,
            className: validationErrors[color.cssVar] ? "border-destructive" : ""
          }
        ),
        validationErrors[color.cssVar] && /* @__PURE__ */ jsx74("p", { className: "text-xs text-destructive px-1", children: validationErrors[color.cssVar] })
      ] }, color.cssVar))
    },
    group.title
  )) });
}
__name(ColorsPanel, "ColorsPanel");

// components/theme-customizer/theme-tab.tsx
import { Fragment as Fragment6, jsx as jsx75, jsxs as jsxs47 } from "react/jsx-runtime";
function ThemeTab({
  selectedTheme,
  setSelectedTheme,
  selectedRadius,
  setSelectedRadius,
  setImportedTheme,
  onImportClick,
  variant = "full",
  hidePreset = false
}) {
  const {
    isDarkMode,
    setTheme,
    applyTheme,
    applyRadius: applyRadius2
  } = useThemeManager();
  const handleThemeSelect = /* @__PURE__ */ __name((themeValue) => {
    setSelectedTheme(themeValue);
    setImportedTheme(null);
    applyTheme(themeValue, isDarkMode);
  }, "handleThemeSelect");
  const handleRadiusSelect = /* @__PURE__ */ __name((radius) => {
    setSelectedRadius(radius);
    applyRadius2(radius);
  }, "handleRadiusSelect");
  const handleLightMode = /* @__PURE__ */ __name(() => {
    if (isDarkMode === false) return;
    setTheme("light");
  }, "handleLightMode");
  const handleDarkMode = /* @__PURE__ */ __name(() => {
    if (isDarkMode === true) return;
    setTheme("dark");
  }, "handleDarkMode");
  const showColors = variant === "full" || variant === "colors-only";
  const showOthers = variant === "full" || variant === "others-only";
  const showPreset = showColors && !hidePreset;
  const colorsOnlyInSidebar = showColors && hidePreset && !showPreset && !showOthers;
  return /* @__PURE__ */ jsxs47(
    "div",
    {
      className: colorsOnlyInSidebar ? "px-3 pt-2 pb-4" : "p-4 space-y-6",
      children: [
        showPreset && /* @__PURE__ */ jsxs47(Fragment6, { children: [
          /* @__PURE__ */ jsxs47("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx75("label", { className: "text-sm font-medium", children: "Mindtris UI" }),
            /* @__PURE__ */ jsx75(
              Select,
              {
                value: selectedTheme,
                onChange: (e) => handleThemeSelect(e.target.value),
                children: colorThemes.map((theme) => /* @__PURE__ */ jsx75("option", { value: theme.value, children: theme.name }, theme.value))
              }
            )
          ] }),
          variant === "full" && /* @__PURE__ */ jsx75("div", { className: "border-t border-border" })
        ] }),
        showColors && hidePreset && /* @__PURE__ */ jsx75(ColorsPanel, { selectedTheme, isDarkMode }),
        showOthers && /* @__PURE__ */ jsxs47(Fragment6, { children: [
          variant === "full" && /* @__PURE__ */ jsx75("div", { className: "border-t border-border" }),
          /* @__PURE__ */ jsxs47("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx75("label", { className: "text-sm font-medium", children: "Radius" }),
            /* @__PURE__ */ jsx75("div", { className: "grid grid-cols-5 gap-2", children: radiusOptions.map((option) => /* @__PURE__ */ jsx75(
              "button",
              {
                onClick: () => handleRadiusSelect(option.value),
                className: `
                    relative rounded-md p-3 border transition-colors text-xs font-medium
                    ${selectedRadius === option.value ? "border-primary bg-primary/10" : "border-border hover:border-border/80"}
                  `,
                children: option.name
              },
              option.value
            )) })
          ] }),
          /* @__PURE__ */ jsx75("div", { className: "border-t border-border" }),
          /* @__PURE__ */ jsxs47("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx75("label", { className: "text-sm font-medium", children: "Mode" }),
            /* @__PURE__ */ jsxs47("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs47(
                "button",
                {
                  onClick: handleLightMode,
                  className: `
                  flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${!isDarkMode ? "bg-muted text-foreground" : "bg-card border border-border hover:bg-muted text-foreground"}
                `,
                  children: [
                    /* @__PURE__ */ jsx75(Sun, { className: "w-4 h-4" }),
                    "Light"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs47(
                "button",
                {
                  onClick: handleDarkMode,
                  className: `
                  flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${isDarkMode ? "bg-muted text-foreground" : "bg-card border border-border hover:bg-muted text-foreground"}
                `,
                  children: [
                    /* @__PURE__ */ jsx75(Moon2, { className: "w-4 h-4" }),
                    "Dark"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx75("div", { className: "border-t border-border" }),
          /* @__PURE__ */ jsx75("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs47(
            "button",
            {
              onClick: onImportClick,
              className: "w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors",
              children: [
                /* @__PURE__ */ jsx75(Upload, { className: "w-4 h-4" }),
                "Import Theme"
              ]
            }
          ) })
        ] }),
        variant === "full" && /* @__PURE__ */ jsxs47(Fragment6, { children: [
          /* @__PURE__ */ jsx75("div", { className: "border-t border-border" }),
          /* @__PURE__ */ jsxs47("div", { className: "p-4 bg-muted rounded-lg space-y-3", children: [
            /* @__PURE__ */ jsx75("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx75("span", { className: "text-sm font-medium", children: "Advanced Customization" }) }),
            /* @__PURE__ */ jsxs47("p", { className: "text-xs text-muted-foreground", children: [
              "For advanced theme customization with real-time preview, visit",
              " ",
              /* @__PURE__ */ jsx75(
                "a",
                {
                  href: "https://tweakcn.com/editor/theme",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-primary hover:underline font-medium",
                  children: "tweakcn.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs47(
              "button",
              {
                className: "w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/70 transition-colors text-sm",
                onClick: () => typeof window !== "undefined" && window.open("https://tweakcn.com/editor/theme", "_blank"),
                children: [
                  /* @__PURE__ */ jsx75(ExternalLink, { className: "w-4 h-4" }),
                  "Open Tweakcn"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
__name(ThemeTab, "ThemeTab");

// components/theme-customizer/layout-tab.tsx
import { Fragment as Fragment7, jsx as jsx76, jsxs as jsxs48 } from "react/jsx-runtime";
function LayoutTab({ sidebarConfig, onSidebarConfigChange }) {
  const config = sidebarConfig || {
    variant: "inset",
    collapsible: "offcanvas",
    side: "left"
  };
  const handleSidebarVariantSelect = /* @__PURE__ */ __name((variant) => {
    onSidebarConfigChange?.({ ...config, variant });
  }, "handleSidebarVariantSelect");
  const handleSidebarCollapsibleSelect = /* @__PURE__ */ __name((collapsible) => {
    onSidebarConfigChange?.({ ...config, collapsible });
  }, "handleSidebarCollapsibleSelect");
  const handleSidebarSideSelect = /* @__PURE__ */ __name((side) => {
    onSidebarConfigChange?.({ ...config, side });
  }, "handleSidebarSideSelect");
  return /* @__PURE__ */ jsxs48("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs48("p", { className: "text-xs text-muted-foreground", children: [
      "These options apply only when your app wires ",
      /* @__PURE__ */ jsx76("code", { className: "text-[10px]", children: "sidebarConfig" }),
      " and ",
      /* @__PURE__ */ jsx76("code", { className: "text-[10px]", children: "onSidebarConfigChange" }),
      " to the layout."
    ] }),
    /* @__PURE__ */ jsxs48("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs48("div", { children: [
        /* @__PURE__ */ jsx76("label", { className: "text-sm font-medium", children: "Sidebar Variant" }),
        config.variant && /* @__PURE__ */ jsxs48("p", { className: "text-xs text-muted-foreground mt-1", children: [
          config.variant === "sidebar" && "Default: Standard sidebar layout",
          config.variant === "floating" && "Floating: Floating sidebar with border",
          config.variant === "inset" && "Inset: Inset sidebar with rounded corners"
        ] })
      ] }),
      /* @__PURE__ */ jsx76("div", { className: "grid grid-cols-3 gap-3", children: sidebarVariants.map((variant) => /* @__PURE__ */ jsx76(
        "div",
        {
          onClick: () => handleSidebarVariantSelect(variant.value),
          className: `
                relative p-4 border rounded-md cursor-pointer transition-colors
                ${config.variant === variant.value ? "border-primary bg-primary/10" : "border-border hover:border-border/80"}
              `,
          children: /* @__PURE__ */ jsxs48("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx76("div", { className: "text-xs font-semibold text-center", children: variant.name }),
            /* @__PURE__ */ jsxs48("div", { className: `flex h-12 rounded border border-border ${variant.value === "inset" ? "bg-muted" : "bg-card"}`, children: [
              /* @__PURE__ */ jsxs48(
                "div",
                {
                  className: `w-3 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 ${variant.value === "floating" ? "border-r m-1 rounded" : variant.value === "inset" ? "m-1 ms-0 rounded bg-muted/70" : "border-r"}`,
                  children: [
                    /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-full bg-muted-foreground/70 rounded" }),
                    /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/60 rounded" }),
                    /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-2/3 bg-muted-foreground/50 rounded" }),
                    /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/40 rounded" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx76("div", { className: `flex-1 ${variant.value === "inset" ? "bg-card ms-0" : "bg-muted"} m-1 rounded-sm border-dashed border border-border` })
            ] })
          ] })
        },
        variant.value
      )) })
    ] }),
    /* @__PURE__ */ jsxs48("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs48("div", { children: [
        /* @__PURE__ */ jsx76("label", { className: "text-sm font-medium", children: "Sidebar Collapsible Mode" }),
        config.collapsible && /* @__PURE__ */ jsxs48("p", { className: "text-xs text-muted-foreground mt-1", children: [
          config.collapsible === "offcanvas" && "Off Canvas: Slides out of view",
          config.collapsible === "icon" && "Icon: Collapses to icon only",
          config.collapsible === "none" && "None: Always visible"
        ] })
      ] }),
      /* @__PURE__ */ jsx76("div", { className: "grid grid-cols-3 gap-3", children: sidebarCollapsibleOptions.map((option) => /* @__PURE__ */ jsx76(
        "div",
        {
          onClick: () => handleSidebarCollapsibleSelect(option.value),
          className: `
                relative p-4 border rounded-md cursor-pointer transition-colors
                ${config.collapsible === option.value ? "border-primary bg-primary/10" : "border-border hover:border-border/80"}
              `,
          children: /* @__PURE__ */ jsxs48("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx76("div", { className: "text-xs font-semibold text-center", children: option.name }),
            /* @__PURE__ */ jsx76("div", { className: "flex h-12 rounded border border-border bg-card", children: option.value === "offcanvas" ? /* @__PURE__ */ jsx76("div", { className: "flex-1 bg-muted m-1 rounded-sm border-dashed border border-border flex items-center justify-start pl-2", children: /* @__PURE__ */ jsxs48("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ jsx76("div", { className: "w-3 h-0.5 bg-muted-foreground/70 rounded" }),
              /* @__PURE__ */ jsx76("div", { className: "w-3 h-0.5 bg-muted-foreground/70 rounded" }),
              /* @__PURE__ */ jsx76("div", { className: "w-3 h-0.5 bg-muted-foreground/70 rounded" })
            ] }) }) : option.value === "icon" ? /* @__PURE__ */ jsxs48(Fragment7, { children: [
              /* @__PURE__ */ jsxs48("div", { className: "w-4 flex-shrink-0 bg-muted/70 flex flex-col gap-1 p-1 border-r border-border items-center", children: [
                /* @__PURE__ */ jsx76("div", { className: "w-2 h-2 bg-muted-foreground/70 rounded-sm" }),
                /* @__PURE__ */ jsx76("div", { className: "w-2 h-2 bg-muted-foreground/60 rounded-sm" }),
                /* @__PURE__ */ jsx76("div", { className: "w-2 h-2 bg-muted-foreground/50 rounded-sm" })
              ] }),
              /* @__PURE__ */ jsx76("div", { className: "flex-1 bg-muted m-1 rounded-sm border-dashed border border-border" })
            ] }) : /* @__PURE__ */ jsxs48(Fragment7, { children: [
              /* @__PURE__ */ jsxs48("div", { className: "w-6 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 border-r border-border", children: [
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-full bg-muted-foreground/70 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/60 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-2/3 bg-muted-foreground/50 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/40 rounded" })
              ] }),
              /* @__PURE__ */ jsx76("div", { className: "flex-1 bg-muted m-1 rounded-sm border-dashed border border-border" })
            ] }) })
          ] })
        },
        option.value
      )) })
    ] }),
    /* @__PURE__ */ jsxs48("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs48("div", { children: [
        /* @__PURE__ */ jsx76("label", { className: "text-sm font-medium", children: "Sidebar Position" }),
        config.side && /* @__PURE__ */ jsxs48("p", { className: "text-xs text-muted-foreground mt-1", children: [
          config.side === "left" && "Left: Sidebar positioned on the left side",
          config.side === "right" && "Right: Sidebar positioned on the right side"
        ] })
      ] }),
      /* @__PURE__ */ jsx76("div", { className: "grid grid-cols-2 gap-3", children: sidebarSideOptions.map((side) => /* @__PURE__ */ jsx76(
        "div",
        {
          onClick: () => handleSidebarSideSelect(side.value),
          className: `
                relative p-4 border rounded-md cursor-pointer transition-colors
                ${config.side === side.value ? "border-primary bg-primary/10" : "border-border hover:border-border/80"}
              `,
          children: /* @__PURE__ */ jsxs48("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx76("div", { className: "text-xs font-semibold text-center", children: side.name }),
            /* @__PURE__ */ jsx76("div", { className: "flex h-12 rounded border border-border bg-card", children: side.value === "left" ? /* @__PURE__ */ jsxs48(Fragment7, { children: [
              /* @__PURE__ */ jsxs48("div", { className: "w-6 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 border-r border-border", children: [
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-full bg-muted-foreground/70 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/60 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-2/3 bg-muted-foreground/50 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/40 rounded" })
              ] }),
              /* @__PURE__ */ jsx76("div", { className: "flex-1 bg-muted m-1 rounded-sm border-dashed border border-border" })
            ] }) : /* @__PURE__ */ jsxs48(Fragment7, { children: [
              /* @__PURE__ */ jsx76("div", { className: "flex-1 bg-muted m-1 rounded-sm border-dashed border border-border" }),
              /* @__PURE__ */ jsxs48("div", { className: "w-6 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 border-l border-border", children: [
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-full bg-muted-foreground/70 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/60 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-2/3 bg-muted-foreground/50 rounded" }),
                /* @__PURE__ */ jsx76("div", { className: "h-0.5 w-3/4 bg-muted-foreground/40 rounded" })
              ] })
            ] }) })
          ] })
        },
        side.value
      )) })
    ] })
  ] });
}
__name(LayoutTab, "LayoutTab");

// components/theme-customizer/other-panel.tsx
import React42 from "react";
import { jsx as jsx77, jsxs as jsxs49 } from "react/jsx-runtime";
function getComputedOtherValues() {
  if (typeof document === "undefined") return {};
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const get = /* @__PURE__ */ __name((name) => styles.getPropertyValue(`--${name}`).trim(), "get");
  return {
    "--hue-shift": get("hue-shift") || "0",
    "--saturation-mult": get("saturation-mult") || "1",
    "--lightness-mult": get("lightness-mult") || "1",
    "--spacing": get("spacing") || "",
    "--shadow-color": get("shadow-color") || "",
    "--shadow-opacity": get("shadow-opacity") || "",
    "--shadow-blur": get("shadow-blur") || "",
    "--shadow-spread": get("shadow-spread") || "",
    "--shadow-x": get("shadow-x") || "",
    "--shadow-y": get("shadow-y") || ""
  };
}
__name(getComputedOtherValues, "getComputedOtherValues");
function getComputedRadius() {
  if (typeof document === "undefined") return "";
  const styles = getComputedStyle(document.documentElement);
  return styles.getPropertyValue("--radius").trim();
}
__name(getComputedRadius, "getComputedRadius");
function OtherPanel({
  selectedRadius,
  setSelectedRadius,
  onImportClick,
  hideModeSection = false,
  hideLayoutSection = false,
  sidebarConfig,
  onSidebarConfigChange
}) {
  const { applyRadius: applyRadius2, setTheme, isDarkMode, handleColorChange: handleColorChange2 } = useThemeManager();
  const [hslOpen, setHslOpen] = React42.useState(true);
  const [hslPresetsOpen, setHslPresetsOpen] = React42.useState(true);
  const [radiusOpen, setRadiusOpen] = React42.useState(true);
  const [spacingOpen, setSpacingOpen] = React42.useState(true);
  const [shadowOpen, setShadowOpen] = React42.useState(true);
  const [values, setValues] = React42.useState({});
  const [uncontrolledRadius, setUncontrolledRadius] = React42.useState("");
  const effectiveRadius = selectedRadius ?? uncontrolledRadius;
  React42.useEffect(() => {
    setValues(getComputedOtherValues());
    if (selectedRadius == null) {
      setUncontrolledRadius(getComputedRadius());
    }
  }, [isDarkMode, selectedRadius]);
  React42.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const refresh = /* @__PURE__ */ __name(() => {
      setValues(getComputedOtherValues());
      if (selectedRadius == null) {
        setUncontrolledRadius(getComputedRadius());
      }
    }, "refresh");
    refresh();
    const obs = new MutationObserver(() => refresh());
    obs.observe(root, { attributes: true, attributeFilter: ["style", "class"] });
    return () => obs.disconnect();
  }, [selectedRadius]);
  const [validationErrors, setValidationErrors] = React42.useState({});
  const handleChange = /* @__PURE__ */ __name((cssVar, value) => {
    let validation = { isValid: true };
    if (cssVar === "--hue-shift") {
      validation = validateHSLValue(value, "hue");
    } else if (cssVar === "--saturation-mult") {
      validation = validateHSLValue(value, "saturation");
    } else if (cssVar === "--lightness-mult") {
      validation = validateHSLValue(value, "lightness");
    } else if (cssVar === "--spacing") {
      validation = validateSpacingValue(value);
    } else if (cssVar === "--shadow-opacity") {
      validation = validateShadowValue(value, "opacity");
    } else if (cssVar === "--shadow-blur") {
      validation = validateShadowValue(value, "blur");
    } else if (cssVar === "--shadow-spread") {
      validation = validateShadowValue(value, "spread");
    } else if (cssVar === "--shadow-x" || cssVar === "--shadow-y") {
      validation = validateShadowValue(value, "offset");
    }
    if (validation.isValid) {
      handleColorChange2(cssVar, value);
      setValues((prev) => ({ ...prev, [cssVar]: value }));
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[cssVar];
        return next;
      });
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        [cssVar]: validation.error || "Invalid value"
      }));
    }
  }, "handleChange");
  const handleRadiusSelect = /* @__PURE__ */ __name((value) => {
    const validation = validateRadiusValue(value);
    if (validation.isValid) {
      if (setSelectedRadius) setSelectedRadius(value);
      else setUncontrolledRadius(value);
      applyRadius2(value);
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next["--radius"];
        return next;
      });
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        "--radius": validation.error || "Invalid radius value"
      }));
    }
  }, "handleRadiusSelect");
  const hslPresets = React42.useMemo(
    () => [
      { name: "Default", hue: 0, sat: 1, light: 1 },
      { name: "Warm", hue: 30, sat: 1.2, light: 1.05 },
      { name: "Sunset", hue: 60, sat: 1.5, light: 1.1 },
      { name: "Cool", hue: 220, sat: 1.15, light: 1.05 },
      { name: "Neon", hue: 120, sat: 1.8, light: 1.05 },
      { name: "Muted", hue: 0, sat: 0.8, light: 1 },
      { name: "Contrast+", hue: 0, sat: 1, light: 1.15 },
      { name: "Contrast-", hue: 0, sat: 1, light: 0.9 },
      { name: "Mono+", hue: 0, sat: 0.6, light: 1.05 },
      { name: "Mono-", hue: 0, sat: 0.6, light: 0.95 }
    ],
    []
  );
  const setHsl = React42.useCallback(
    (next) => {
      const hue = next.hue ?? (parseFloat(values["--hue-shift"] ?? "0") || 0);
      const sat = next.sat ?? (parseFloat(values["--saturation-mult"] ?? "1") || 1);
      const light = next.light ?? (parseFloat(values["--lightness-mult"] ?? "1") || 1);
      handleChange("--hue-shift", String(hue));
      handleChange("--saturation-mult", String(sat));
      handleChange("--lightness-mult", String(light));
    },
    [handleChange, values]
  );
  return /* @__PURE__ */ jsxs49("div", { className: "space-y-4 pt-5 pb-2", children: [
    !hideModeSection && /* @__PURE__ */ jsxs49("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx77("label", { className: "block text-sm font-medium", children: "Mode" }),
      /* @__PURE__ */ jsxs49("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsx77(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setTheme("light"),
            className: cn(!isDarkMode && "border-primary bg-primary/10 text-primary"),
            children: "Light"
          }
        ),
        /* @__PURE__ */ jsx77(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setTheme("dark"),
            className: cn(isDarkMode && "border-primary bg-primary/10 text-primary"),
            children: "Dark"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx77(CollapsibleSection, { title: "HSL Adjustments", open: hslOpen, onToggle: () => setHslOpen(!hslOpen), children: /* @__PURE__ */ jsxs49("div", { className: "pt-2 space-y-4", children: [
      /* @__PURE__ */ jsx77("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs49(
        "button",
        {
          type: "button",
          onClick: () => setHslPresetsOpen((v) => !v),
          className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2",
          children: [
            hslPresetsOpen ? "Hide presets" : "Show presets",
            /* @__PURE__ */ jsx77("span", { className: cn("transition-transform", hslPresetsOpen ? "rotate-180" : ""), children: "^" })
          ]
        }
      ) }),
      hslPresetsOpen && /* @__PURE__ */ jsx77("div", { className: "flex flex-wrap items-center justify-center gap-2", children: hslPresets.map((p) => /* @__PURE__ */ jsx77(
        "button",
        {
          type: "button",
          onClick: () => setHsl({ hue: p.hue, sat: p.sat, light: p.light }),
          className: "h-10 w-10 rounded-lg border border-border bg-card shadow-none overflow-hidden",
          "aria-label": `HSL preset: ${p.name}`,
          title: p.name,
          children: /* @__PURE__ */ jsx77(
            "div",
            {
              className: "h-full w-full",
              style: {
                background: `linear-gradient(90deg, hsl(${p.hue} 80% 45%) 0 50%, hsl(${(p.hue + 220) % 360} 80% 55%) 50% 100%)`
              }
            }
          )
        },
        p.name
      )) }),
      /* @__PURE__ */ jsxs49("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs49("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs49("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx77("label", { className: "text-sm font-medium", children: "Hue Shift" }),
            /* @__PURE__ */ jsxs49("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx77(
                Input,
                {
                  type: "text",
                  value: values["--hue-shift"] ?? "0",
                  onChange: (e) => handleChange("--hue-shift", e.target.value),
                  className: cn(
                    "w-20 font-mono text-xs shadow-none",
                    validationErrors["--hue-shift"] && "border-destructive"
                  )
                }
              ),
              /* @__PURE__ */ jsx77("span", { className: "text-xs text-muted-foreground", children: "deg" })
            ] })
          ] }),
          /* @__PURE__ */ jsx77(
            "input",
            {
              type: "range",
              min: 0,
              max: 360,
              step: 1,
              value: parseFloat(values["--hue-shift"] ?? "0") || 0,
              onChange: (e) => handleChange("--hue-shift", e.target.value),
              className: "w-full h-2 rounded-full bg-muted accent-foreground"
            }
          ),
          validationErrors["--hue-shift"] && /* @__PURE__ */ jsx77("p", { className: "text-xs text-destructive", children: validationErrors["--hue-shift"] })
        ] }),
        /* @__PURE__ */ jsxs49("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs49("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx77("label", { className: "text-sm font-medium", children: "Saturation Multiplier" }),
            /* @__PURE__ */ jsxs49("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx77(
                Input,
                {
                  type: "text",
                  value: values["--saturation-mult"] ?? "1",
                  onChange: (e) => handleChange("--saturation-mult", e.target.value),
                  className: cn(
                    "w-20 font-mono text-xs shadow-none",
                    validationErrors["--saturation-mult"] && "border-destructive"
                  )
                }
              ),
              /* @__PURE__ */ jsx77("span", { className: "text-xs text-muted-foreground", children: "x" })
            ] })
          ] }),
          /* @__PURE__ */ jsx77(
            "input",
            {
              type: "range",
              min: 0,
              max: 3,
              step: 0.05,
              value: parseFloat(values["--saturation-mult"] ?? "1") || 1,
              onChange: (e) => handleChange("--saturation-mult", e.target.value),
              className: "w-full h-2 rounded-full bg-muted accent-foreground"
            }
          ),
          validationErrors["--saturation-mult"] && /* @__PURE__ */ jsx77("p", { className: "text-xs text-destructive", children: validationErrors["--saturation-mult"] })
        ] }),
        /* @__PURE__ */ jsxs49("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs49("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx77("label", { className: "text-sm font-medium", children: "Lightness Multiplier" }),
            /* @__PURE__ */ jsxs49("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx77(
                Input,
                {
                  type: "text",
                  value: values["--lightness-mult"] ?? "1",
                  onChange: (e) => handleChange("--lightness-mult", e.target.value),
                  className: cn(
                    "w-20 font-mono text-xs shadow-none",
                    validationErrors["--lightness-mult"] && "border-destructive"
                  )
                }
              ),
              /* @__PURE__ */ jsx77("span", { className: "text-xs text-muted-foreground", children: "x" })
            ] })
          ] }),
          /* @__PURE__ */ jsx77(
            "input",
            {
              type: "range",
              min: 0,
              max: 3,
              step: 0.05,
              value: parseFloat(values["--lightness-mult"] ?? "1") || 1,
              onChange: (e) => handleChange("--lightness-mult", e.target.value),
              className: "w-full h-2 rounded-full bg-muted accent-foreground"
            }
          ),
          validationErrors["--lightness-mult"] && /* @__PURE__ */ jsx77("p", { className: "text-xs text-destructive", children: validationErrors["--lightness-mult"] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx77(CollapsibleSection, { title: "Radius", open: radiusOpen, onToggle: () => setRadiusOpen(!radiusOpen), children: /* @__PURE__ */ jsxs49("div", { className: "pt-2 space-y-2", children: [
      /* @__PURE__ */ jsx77("label", { className: "text-sm font-medium", children: "Corner radius" }),
      /* @__PURE__ */ jsx77("div", { className: "flex flex-wrap gap-2", children: radiusOptions.map((opt) => /* @__PURE__ */ jsx77(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => handleRadiusSelect(opt.value),
          className: cn(effectiveRadius === opt.value && "border-primary bg-primary/10 text-primary"),
          children: opt.name
        },
        opt.value
      )) }),
      validationErrors["--radius"] && /* @__PURE__ */ jsx77("p", { className: "text-xs text-destructive", children: validationErrors["--radius"] })
    ] }) }),
    /* @__PURE__ */ jsx77(CollapsibleSection, { title: "Spacing", open: spacingOpen, onToggle: () => setSpacingOpen(!spacingOpen), children: /* @__PURE__ */ jsxs49("div", { className: "pt-2 space-y-1", children: [
      /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Spacing (base scale for layout, rem)" }),
      /* @__PURE__ */ jsx77(
        Input,
        {
          type: "text",
          value: values["--spacing"] ?? "",
          onChange: (e) => handleChange("--spacing", e.target.value),
          placeholder: "rem",
          className: cn(
            "font-mono text-xs",
            validationErrors["--spacing"] && "border-destructive"
          )
        }
      ),
      validationErrors["--spacing"] && /* @__PURE__ */ jsx77("p", { className: "text-xs text-destructive", children: validationErrors["--spacing"] })
    ] }) }),
    /* @__PURE__ */ jsx77(CollapsibleSection, { title: "Shadow", open: shadowOpen, onToggle: () => setShadowOpen(!shadowOpen), children: /* @__PURE__ */ jsxs49("div", { className: "space-y-3 pt-2", children: [
      /* @__PURE__ */ jsxs49("div", { children: [
        /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Shadow color" }),
        /* @__PURE__ */ jsx77(
          Input,
          {
            type: "text",
            value: values["--shadow-color"] ?? "",
            onChange: (e) => handleChange("--shadow-color", e.target.value),
            placeholder: "\u2014",
            className: "font-mono text-xs"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs49("div", { children: [
        /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Shadow Opacity" }),
        /* @__PURE__ */ jsx77(
          Input,
          {
            type: "text",
            value: values["--shadow-opacity"] ?? "",
            onChange: (e) => handleChange("--shadow-opacity", e.target.value),
            placeholder: "\u2014",
            className: "font-mono text-xs"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs49("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxs49("div", { children: [
          /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Blur radius" }),
          /* @__PURE__ */ jsx77(
            Input,
            {
              type: "text",
              value: values["--shadow-blur"] ?? "",
              onChange: (e) => handleChange("--shadow-blur", e.target.value),
              placeholder: "px",
              className: "font-mono text-xs"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs49("div", { children: [
          /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Spread" }),
          /* @__PURE__ */ jsx77(
            Input,
            {
              type: "text",
              value: values["--shadow-spread"] ?? "",
              onChange: (e) => handleChange("--shadow-spread", e.target.value),
              placeholder: "px",
              className: "font-mono text-xs"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs49("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxs49("div", { children: [
          /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Offset X" }),
          /* @__PURE__ */ jsx77(
            Input,
            {
              type: "text",
              value: values["--shadow-x"] ?? "",
              onChange: (e) => handleChange("--shadow-x", e.target.value),
              placeholder: "px",
              className: "font-mono text-xs"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs49("div", { children: [
          /* @__PURE__ */ jsx77("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Offset Y" }),
          /* @__PURE__ */ jsx77(
            Input,
            {
              type: "text",
              value: values["--shadow-y"] ?? "",
              onChange: (e) => handleChange("--shadow-y", e.target.value),
              placeholder: "px",
              className: "font-mono text-xs"
            }
          )
        ] })
      ] })
    ] }) }),
    !hideLayoutSection && /* @__PURE__ */ jsx77(LayoutTab, { sidebarConfig, onSidebarConfigChange })
  ] });
}
__name(OtherPanel, "OtherPanel");

// components/theme-customizer/import-modal.tsx
import React43 from "react";
import { X as X8, Check as Check6 } from "lucide-react";
import { Fragment as Fragment8, jsx as jsx78, jsxs as jsxs50 } from "react/jsx-runtime";
function normalizeImportedThemeVars(vars) {
  const out = {};
  Object.entries(vars).forEach(([key, value]) => {
    const k = key.trim().replace(/^--/, "");
    out[k] = value.trim();
  });
  return out;
}
__name(normalizeImportedThemeVars, "normalizeImportedThemeVars");
function ImportModal({ open, onOpenChange, onImport, onImportArtifact }) {
  const [importText, setImportText] = React43.useState("");
  const [themeName, setThemeName] = React43.useState("");
  const [error, setError] = React43.useState(null);
  const raw = importText.trim();
  const isJsonArtifact = raw.startsWith("{");
  const canImport = Boolean(raw) && (isJsonArtifact || Boolean(themeName.trim()));
  const processImport = /* @__PURE__ */ __name(() => {
    try {
      if (!importText.trim()) {
        setError("Please paste CSS or theme.json content");
        return;
      }
      const raw2 = importText.trim();
      if (raw2.startsWith("{")) {
        const parsed = JSON.parse(raw2);
        const validation2 = validateCustomThemeArtifact(parsed);
        if (!validation2.isValid) {
          setError(validation2.error || "Invalid theme.json format");
          return;
        }
        if (!onImportArtifact) {
          setError("Theme.json import is not supported in this app");
          return;
        }
        const artifact = parsed;
        const nextArtifact = themeName.trim() ? { ...artifact, name: themeName.trim() } : artifact;
        setError(null);
        onImportArtifact(nextArtifact);
        onOpenChange(false);
        setImportText("");
        setThemeName("");
        return;
      }
      const lightTheme = {};
      const darkTheme = {};
      const cssText = importText.replace(/\/\*[\s\S]*?\*\//g, "");
      const rootMatch = cssText.match(/:root\s*\{([^}]+)\}/);
      if (rootMatch) {
        const rootContent = rootMatch[1];
        const variableMatches = rootContent.matchAll(/--([^:]+):\s*([^;]+);/g);
        Array.from(variableMatches).forEach((match2) => {
          const [, variable, value] = match2;
          lightTheme[String(variable).trim()] = String(value).trim();
        });
      }
      const darkMatch = cssText.match(/\.dark\s*\{([^}]+)\}/);
      if (darkMatch) {
        const darkContent = darkMatch[1];
        const variableMatches = darkContent.matchAll(/--([^:]+):\s*([^;]+);/g);
        Array.from(variableMatches).forEach((match2) => {
          const [, variable, value] = match2;
          darkTheme[String(variable).trim()] = String(value).trim();
        });
      }
      if (!themeName.trim()) {
        setError("Please enter a theme name");
        return;
      }
      if (!onImport) {
        setError("CSS theme import is not supported in this app");
        return;
      }
      const importedThemeData = {
        light: normalizeImportedThemeVars(lightTheme),
        dark: normalizeImportedThemeVars(darkTheme)
      };
      const validation = validateImportedTheme(importedThemeData);
      if (!validation.isValid) {
        setError(validation.error || "Invalid theme format");
        return;
      }
      setError(null);
      onImport(importedThemeData, themeName.trim());
      onOpenChange(false);
      setImportText("");
      setThemeName("");
    } catch (error2) {
      setError(error2 instanceof Error ? error2.message : "Failed to import theme");
      console.error("Error importing theme:", error2);
    }
  }, "processImport");
  if (!open) return null;
  return /* @__PURE__ */ jsxs50(Fragment8, { children: [
    /* @__PURE__ */ jsx78(
      "div",
      {
        className: "fixed inset-0 bg-foreground/20 z-[60]",
        onClick: () => onOpenChange(false)
      }
    ),
    /* @__PURE__ */ jsx78("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs50("div", { className: "bg-card text-card-foreground rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col border border-border", children: [
      /* @__PURE__ */ jsx78("div", { className: "p-6 border-b border-border", children: /* @__PURE__ */ jsxs50("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs50("div", { children: [
          /* @__PURE__ */ jsx78("h3", { className: "text-lg font-semibold", children: "Import Theme" }),
          /* @__PURE__ */ jsxs50("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Paste either a standardized ",
            /* @__PURE__ */ jsx78("code", { className: "px-1 py-0.5 bg-muted rounded", children: "theme.json" }),
            " artifact (recommended) or a CSS theme with ",
            /* @__PURE__ */ jsx78("code", { className: "px-1 py-0.5 bg-muted rounded", children: ":root" }),
            " and ",
            /* @__PURE__ */ jsx78("code", { className: "px-1 py-0.5 bg-muted rounded", children: ".dark" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx78(
          "button",
          {
            onClick: () => onOpenChange(false),
            className: "p-2 rounded-md hover:bg-muted transition-colors text-lg",
            children: "\u2715"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs50("div", { className: "p-6 flex-1 overflow-y-auto space-y-4", children: [
        error && /* @__PURE__ */ jsx78("div", { className: "rounded-lg border border-destructive bg-destructive/10 p-3", children: /* @__PURE__ */ jsx78("p", { className: "text-sm text-destructive", children: error }) }),
        /* @__PURE__ */ jsxs50("div", { children: [
          /* @__PURE__ */ jsx78("label", { className: "block text-sm font-medium mb-2", children: "Theme name" }),
          /* @__PURE__ */ jsx78(
            Input,
            {
              type: "text",
              placeholder: "Optional for theme.json, required for CSS",
              value: themeName,
              onChange: (e) => {
                setThemeName(e.target.value);
                setError(null);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs50("div", { children: [
          /* @__PURE__ */ jsx78("label", { className: "block text-sm font-medium mb-2", children: "Theme content" }),
          /* @__PURE__ */ jsx78(
            "textarea",
            {
              className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground min-h-[300px] max-h-[400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border/80",
              placeholder: `// theme.json (recommended)
{
  "version": 1,
  "name": "Custom",
  "base": { "type": "preset", "value": "default" },
  "overrides": { "other": { "hue-shift": "60" } }
}

// OR CSS
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #171717;
  /* And more */
}
.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #e5e5e5;
  /* And more */
}`,
              value: importText,
              onChange: (e) => {
                setImportText(e.target.value);
                setError(null);
              }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs50("div", { className: "p-6 border-t border-border flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx78(
          Button,
          {
            variant: "icon",
            size: "md",
            onClick: () => onOpenChange(false),
            "aria-label": "Cancel",
            children: /* @__PURE__ */ jsx78(X8, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx78(
          Button,
          {
            variant: "icon",
            size: "md",
            onClick: processImport,
            disabled: !canImport,
            "aria-label": "Import theme",
            children: /* @__PURE__ */ jsx78(Check6, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }) })
  ] });
}
__name(ImportModal, "ImportModal");

// components/theme-customizer/index.tsx
import { Fragment as Fragment9, jsx as jsx79, jsxs as jsxs51 } from "react/jsx-runtime";
function ThemeCustomizer({
  open,
  onOpenChange,
  inline = false,
  hideHeader = false,
  section: sectionProp,
  presetInHeader = false,
  selectedTheme: selectedThemeProp,
  setSelectedTheme: setSelectedThemeProp,
  sidebarConfig,
  onSidebarConfigChange,
  hideImportInOthers = false,
  hideLayoutSection = false
}) {
  const { applyImportedTheme: applyImportedTheme2, isDarkMode, resetTheme: resetTheme2, applyRadius: applyRadius2, setBrandColorsValues, applyTheme } = useThemeManager();
  const [internalTheme, setInternalTheme] = React44.useState("mindtris-ui");
  const selectedTheme = selectedThemeProp ?? internalTheme;
  const setSelectedTheme = setSelectedThemeProp ?? setInternalTheme;
  const [selectedRadius, setSelectedRadius] = React44.useState("0.5rem");
  const [importModalOpen, setImportModalOpen] = React44.useState(false);
  const [importedTheme, setImportedTheme] = React44.useState(null);
  const handleReset = /* @__PURE__ */ __name(() => {
    setSelectedTheme("mindtris-ui");
    setSelectedRadius("0.5rem");
    setImportedTheme(null);
    setBrandColorsValues({});
    resetTheme2();
    applyRadius2("0.5rem");
  }, "handleReset");
  const handleImport = /* @__PURE__ */ __name((themeData) => {
    setImportedTheme(themeData);
    setSelectedTheme("");
    applyImportedTheme2(themeData, isDarkMode);
  }, "handleImport");
  React44.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme2(importedTheme, isDarkMode);
    } else if (selectedTheme) {
      applyTheme(selectedTheme, isDarkMode);
    }
  }, [isDarkMode, importedTheme, selectedTheme, applyImportedTheme2, applyTheme]);
  React44.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme2(importedTheme, isDarkMode);
    } else {
      applyTheme(selectedTheme, isDarkMode);
    }
    applyRadius2(selectedRadius);
  }, []);
  if (!open && !inline) return null;
  const content = /* @__PURE__ */ jsxs51(
    "div",
    {
      className: inline ? "flex flex-col h-full" : "fixed inset-y-0 right-0 z-50 w-96 bg-card text-card-foreground border-l border-border shadow-lg flex flex-col",
      children: [
        !hideHeader && /* @__PURE__ */ jsx79("div", { className: "p-4 border-b border-border", children: /* @__PURE__ */ jsxs51("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx79("div", { className: "p-2 bg-primary/10 rounded-lg", children: /* @__PURE__ */ jsx79(Settings, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsx79("h2", { className: "text-lg font-semibold", children: "Customizer" }),
          /* @__PURE__ */ jsxs51("div", { className: "ml-auto flex items-center gap-2", children: [
            /* @__PURE__ */ jsx79(Button, { variant: "ghost", size: "sm", onClick: handleReset, children: "Reset" }),
            !inline && /* @__PURE__ */ jsx79(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => onOpenChange(false),
                className: "p-1.5",
                "aria-label": "Close",
                tooltip: "Close",
                children: /* @__PURE__ */ jsx79(X9, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs51("div", { className: "flex-1 overflow-y-auto min-h-0", children: [
          sectionProp === "colors" && /* @__PURE__ */ jsx79(
            ThemeTab,
            {
              selectedTheme,
              setSelectedTheme,
              selectedRadius,
              setSelectedRadius,
              setImportedTheme,
              onImportClick: () => setImportModalOpen(true),
              variant: "colors-only",
              hidePreset: presetInHeader
            }
          ),
          sectionProp === "others" && /* @__PURE__ */ jsx79("div", { className: "px-3 pt-2 pb-4", children: /* @__PURE__ */ jsx79(
            OtherPanel,
            {
              selectedRadius,
              setSelectedRadius,
              onImportClick: hideImportInOthers ? void 0 : () => setImportModalOpen(true),
              hideLayoutSection,
              sidebarConfig,
              onSidebarConfigChange
            }
          ) }),
          !sectionProp && /* @__PURE__ */ jsxs51(Fragment9, { children: [
            /* @__PURE__ */ jsx79(
              ThemeTab,
              {
                selectedTheme,
                setSelectedTheme,
                selectedRadius,
                setSelectedRadius,
                setImportedTheme,
                onImportClick: () => setImportModalOpen(true),
                variant: "full"
              }
            ),
            /* @__PURE__ */ jsx79("div", { className: "border-t border-border" }),
            /* @__PURE__ */ jsx79(
              LayoutTab,
              {
                sidebarConfig,
                onSidebarConfigChange
              }
            )
          ] })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxs51(Fragment9, { children: [
    content,
    !inline && /* @__PURE__ */ jsx79(
      "div",
      {
        className: "fixed inset-0 bg-foreground/20 z-40",
        onClick: () => onOpenChange(false)
      }
    ),
    !hideImportInOthers && /* @__PURE__ */ jsx79(
      ImportModal,
      {
        open: importModalOpen,
        onOpenChange: setImportModalOpen,
        onImport: handleImport
      }
    )
  ] });
}
__name(ThemeCustomizer, "ThemeCustomizer");

// components/theme-customizer/typography-panel.tsx
import React45 from "react";

// theme/google-fonts.ts
var GOOGLE_FONTS_MAP = {
  Inter: "Inter:wght@400;500;600;700&display=swap",
  "Fira Code": "Fira+Code:wght@400;500;600&display=swap",
  "Fira Mono": "Fira+Mono:wght@400;500;600&display=swap",
  Roboto: "Roboto:wght@400;500;700&display=swap",
  "Open Sans": "Open+Sans:wght@400;600;700&display=swap",
  Lato: "Lato:wght@400;700&display=swap",
  Oswald: "Oswald:wght@400;500;600&display=swap",
  Source: "Source+Sans+3:wght@400;600;700&display=swap",
  "Source Sans 3": "Source+Sans+3:wght@400;600;700&display=swap",
  Montserrat: "Montserrat:wght@400;500;600;700&display=swap",
  Poppins: "Poppins:wght@400;500;600;700&display=swap",
  Nunito: "Nunito:wght@400;600;700&display=swap",
  "DM Sans": "DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700&display=swap",
  "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
  Merriweather: "Merriweather:ital,wght@0,400;0,700;1,400&display=swap",
  "Playfair Display": "Playfair+Display:ital,wght@0,400;0,600;0,700&display=swap"
};
var LINK_ID = "design-google-fonts";
var LOADING_STATE_KEY = "design-google-fonts-loading";
function extractFirstQuotedFamily(value) {
  const match2 = value.match(/"([^"]+)"/);
  return match2 ? match2[1] : null;
}
__name(extractFirstQuotedFamily, "extractFirstQuotedFamily");
function getGoogleFontsSpec(fontFamily) {
  const key = Object.keys(GOOGLE_FONTS_MAP).find(
    (k) => k.toLowerCase() === fontFamily.toLowerCase()
  );
  return key ? GOOGLE_FONTS_MAP[key] : null;
}
__name(getGoogleFontsSpec, "getGoogleFontsSpec");
function isFontLoaded(fontFamily) {
  if (typeof document === "undefined") return false;
  try {
    return document.fonts.check(`16px "${fontFamily}"`);
  } catch {
    return false;
  }
}
__name(isFontLoaded, "isFontLoaded");
function waitForFontLoad(fontFamily, timeout = 3e3) {
  return new Promise((resolve) => {
    if (isFontLoaded(fontFamily)) {
      resolve(true);
      return;
    }
    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isFontLoaded(fontFamily)) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
}
__name(waitForFontLoad, "waitForFontLoad");
function loadGoogleFontsForFontValue(value) {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve(false);
      return;
    }
    const family = extractFirstQuotedFamily(value);
    if (!family) {
      resolve(false);
      return;
    }
    const spec = getGoogleFontsSpec(family);
    if (!spec) {
      resolve(false);
      return;
    }
    const href = `https://fonts.googleapis.com/css2?family=${spec}`;
    let link = document.getElementById(LINK_ID);
    if (!link) {
      link = document.createElement("link");
      link.id = LINK_ID;
      link.rel = "stylesheet";
      link.setAttribute("data-design", "google-fonts");
      document.head.appendChild(link);
    }
    const loadingState = sessionStorage.getItem(LOADING_STATE_KEY);
    if (loadingState === href && link.href === href) {
      waitForFontLoad(family).then(resolve);
      return;
    }
    sessionStorage.setItem(LOADING_STATE_KEY, href);
    const handleLoad = /* @__PURE__ */ __name(() => {
      sessionStorage.removeItem(LOADING_STATE_KEY);
      waitForFontLoad(family).then(resolve);
    }, "handleLoad");
    const handleError = /* @__PURE__ */ __name(() => {
      sessionStorage.removeItem(LOADING_STATE_KEY);
      console.warn(`Failed to load Google Font: ${family}`);
      resolve(false);
    }, "handleError");
    link.onload = handleLoad;
    link.onerror = handleError;
    if (link.href !== href) {
      link.href = href;
    } else {
      waitForFontLoad(family).then(resolve);
    }
  });
}
__name(loadGoogleFontsForFontValue, "loadGoogleFontsForFontValue");

// components/theme-customizer/typography-panel.tsx
import { jsx as jsx80, jsxs as jsxs52 } from "react/jsx-runtime";
function getComputedTypography() {
  if (typeof document === "undefined") return {};
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  return {
    "--font-sans": styles.getPropertyValue("--font-sans").trim(),
    "--font-serif": styles.getPropertyValue("--font-serif").trim(),
    "--font-mono": styles.getPropertyValue("--font-mono").trim(),
    "--tracking-normal": styles.getPropertyValue("--tracking-normal").trim() || "0"
  };
}
__name(getComputedTypography, "getComputedTypography");
function TypographyPanel() {
  const { handleColorChange: handleColorChange2 } = useThemeManager();
  const [values, setValues] = React45.useState({});
  const [fontOpen, setFontOpen] = React45.useState(true);
  const [letterOpen, setLetterOpen] = React45.useState(true);
  const [loadingFonts, setLoadingFonts] = React45.useState({});
  React45.useEffect(() => {
    setValues(getComputedTypography());
  }, []);
  const handleChange = /* @__PURE__ */ __name(async (cssVar, value) => {
    handleColorChange2(cssVar, value);
    setValues((prev) => ({ ...prev, [cssVar]: value }));
    if (cssVar === "--font-sans" || cssVar === "--font-serif" || cssVar === "--font-mono") {
      setLoadingFonts((prev) => ({ ...prev, [cssVar]: true }));
      try {
        await loadGoogleFontsForFontValue(value);
      } catch (error) {
        console.warn("Failed to load Google Font:", error);
      } finally {
        setLoadingFonts((prev) => ({ ...prev, [cssVar]: false }));
      }
    }
  }, "handleChange");
  return /* @__PURE__ */ jsxs52("div", { className: "space-y-4 pt-5 pb-2", children: [
    /* @__PURE__ */ jsxs52("p", { className: "text-xs text-muted-foreground px-0", children: [
      "Fonts use the theme preset and can load from Google Fonts when selected. Letter spacing uses ",
      /* @__PURE__ */ jsx80("code", { className: "text-xs", children: "--tracking-normal" }),
      "."
    ] }),
    /* @__PURE__ */ jsx80(CollapsibleSection, { title: "Font Family", open: fontOpen, onToggle: () => setFontOpen((o) => !o), children: /* @__PURE__ */ jsxs52("div", { className: "space-y-3 pt-2", children: [
      /* @__PURE__ */ jsxs52("div", { children: [
        /* @__PURE__ */ jsxs52("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsx80("label", { className: "block text-xs font-medium text-muted-foreground", children: "Sans-serif font" }),
          loadingFonts["--font-sans"] && /* @__PURE__ */ jsx80("span", { className: "text-xs text-muted-foreground", children: "Loading..." })
        ] }),
        /* @__PURE__ */ jsx80(
          ClassicDropdown,
          {
            ariaLabel: "Sans-Serif Font",
            value: values["--font-sans"] ?? fontSansOptions[0].value,
            options: fontSansOptions.map((o) => ({ value: o.value, label: o.label })),
            onChange: (value) => handleChange("--font-sans", value),
            fullWidth: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs52("div", { children: [
        /* @__PURE__ */ jsxs52("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsx80("label", { className: "block text-xs font-medium text-muted-foreground", children: "Serif font" }),
          loadingFonts["--font-serif"] && /* @__PURE__ */ jsx80("span", { className: "text-xs text-muted-foreground", children: "Loading..." })
        ] }),
        /* @__PURE__ */ jsx80(
          ClassicDropdown,
          {
            ariaLabel: "Serif Font",
            value: values["--font-serif"] ?? "",
            options: [
              { value: "", label: "\u2014" },
              ...fontSerifOptions.map((o) => ({ value: o.value, label: o.label }))
            ],
            onChange: (value) => handleChange("--font-serif", value),
            fullWidth: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs52("div", { children: [
        /* @__PURE__ */ jsxs52("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsx80("label", { className: "block text-xs font-medium text-muted-foreground", children: "Monospace Font" }),
          loadingFonts["--font-mono"] && /* @__PURE__ */ jsx80("span", { className: "text-xs text-muted-foreground", children: "Loading..." })
        ] }),
        /* @__PURE__ */ jsx80(
          ClassicDropdown,
          {
            ariaLabel: "Monospace Font",
            value: values["--font-mono"] ?? fontMonoOptions[0].value,
            options: fontMonoOptions.map((o) => ({ value: o.value, label: o.label })),
            onChange: (value) => handleChange("--font-mono", value),
            fullWidth: true
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx80(CollapsibleSection, { title: "Letter spacing", open: letterOpen, onToggle: () => setLetterOpen((o) => !o), children: /* @__PURE__ */ jsxs52("div", { className: "pt-2", children: [
      /* @__PURE__ */ jsx80("label", { className: "block text-xs font-medium text-muted-foreground mb-1.5", children: "Letter spacing (em) \u2014 CSS var: --tracking-normal" }),
      /* @__PURE__ */ jsx80(
        Input,
        {
          type: "text",
          value: values["--tracking-normal"] ?? "0",
          onChange: (e) => handleChange("--tracking-normal", e.target.value),
          placeholder: "0",
          className: "font-mono text-xs"
        }
      )
    ] }) })
  ] });
}
__name(TypographyPanel, "TypographyPanel");

// layout-primitives.tsx
import { jsx as jsx81, jsxs as jsxs53 } from "react/jsx-runtime";
var maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
  none: ""
};
var paddingClasses = {
  none: "",
  sm: "px-4",
  md: "px-4 sm:px-6 lg:px-8",
  lg: "px-4 sm:px-6 lg:px-8 xl:px-12"
};
function Container({
  children,
  maxWidth = "2xl",
  padding = "md",
  center = true,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx81(
    "div",
    {
      className: cn(
        "w-full",
        maxWidth !== "none" && maxWidthClasses[maxWidth],
        padding !== "none" && paddingClasses[padding],
        center && "mx-auto",
        className
      ),
      ...props,
      children
    }
  );
}
__name(Container, "Container");
function Page({
  children,
  title,
  description,
  maxWidth = "2xl",
  padding = "md",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx81("div", { className: cn("min-h-screen", className), ...props, children: /* @__PURE__ */ jsxs53(Container, { maxWidth, padding, children: [
    (title || description) && /* @__PURE__ */ jsxs53("div", { className: "mb-8", children: [
      title && /* @__PURE__ */ jsx81("h1", { className: "text-2xl md:text-3xl font-bold text-foreground mb-2", children: title }),
      description && /* @__PURE__ */ jsx81("p", { className: "text-muted-foreground", children: description })
    ] }),
    children
  ] }) });
}
__name(Page, "Page");
function Section({
  children,
  title,
  description,
  maxWidth = "2xl",
  padding = "md",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx81("section", { className: cn("py-8 md:py-12", className), ...props, children: /* @__PURE__ */ jsxs53(Container, { maxWidth, padding, children: [
    (title || description) && /* @__PURE__ */ jsxs53("div", { className: "mb-6", children: [
      title && /* @__PURE__ */ jsx81("h2", { className: "text-xl md:text-2xl font-bold text-foreground mb-2", children: title }),
      description && /* @__PURE__ */ jsx81("p", { className: "text-muted-foreground", children: description })
    ] }),
    children
  ] }) });
}
__name(Section, "Section");
var gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8"
};
function Grid({
  children,
  cols = 1,
  colsSm,
  colsMd,
  gap = "md",
  className,
  ...props
}) {
  const colsClass = `grid-cols-${cols}`;
  const colsSmClass = colsSm ? `sm:grid-cols-${colsSm}` : "";
  const colsMdClass = colsMd ? `md:grid-cols-${colsMd}` : "";
  return /* @__PURE__ */ jsx81(
    "div",
    {
      className: cn(
        "grid",
        colsClass,
        colsSmClass,
        colsMdClass,
        gapClasses[gap],
        className
      ),
      ...props,
      children
    }
  );
}
__name(Grid, "Grid");
function Stack({
  children,
  direction = "col",
  align,
  justify,
  gap = "md",
  wrap = false,
  className,
  ...props
}) {
  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  };
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };
  return /* @__PURE__ */ jsx81(
    "div",
    {
      className: cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        align && alignClasses[align],
        justify && justifyClasses[justify],
        gapClasses[gap],
        wrap && "flex-wrap",
        className
      ),
      ...props,
      children
    }
  );
}
__name(Stack, "Stack");

// blocks/header/header-block.tsx
import { useState as useState22, useEffect as useEffect15 } from "react";
import { Menu as Menu3, ChevronDown as ChevronDown8 } from "lucide-react";
import { jsx as jsx82, jsxs as jsxs54 } from "react/jsx-runtime";
var DefaultLink = /* @__PURE__ */ __name(({ href, className, children, onClick }) => /* @__PURE__ */ jsx82("a", { href, className, onClick, children }), "DefaultLink");
function HeaderBlock({
  data,
  slots = {},
  className,
  sticky = true
}) {
  const [isScrolled, setIsScrolled] = useState22(false);
  const LinkComponent = slots.linkComponent || DefaultLink;
  const LogoComponent = slots.logo || /* @__PURE__ */ jsx82(Logo, {});
  useEffect15(() => {
    const handleScroll = /* @__PURE__ */ __name(() => {
      setIsScrolled(window.scrollY > 0);
    }, "handleScroll");
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const renderDesktopMenuItem = /* @__PURE__ */ __name((item) => {
    if (item.type === "dropdown" && item.children) {
      return /* @__PURE__ */ jsxs54(DropdownMenu, { children: [
        /* @__PURE__ */ jsxs54(DropdownMenuTrigger, { className: "flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", children: [
          item.title,
          /* @__PURE__ */ jsx82(ChevronDown8, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsx82(DropdownMenuContent, { align: "start", className: "w-56", children: item.children.map((child) => {
          if (child.type === "dropdown") {
            return /* @__PURE__ */ jsxs54(DropdownMenuSub, { children: [
              /* @__PURE__ */ jsx82(DropdownMenuSubTrigger, { children: child.title }),
              /* @__PURE__ */ jsx82(DropdownMenuSubContent, { children: child.children?.map((sub) => /* @__PURE__ */ jsx82(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx82(LinkComponent, { href: sub.href || "#", className: "cursor-pointer w-full", children: sub.title }) }, sub.id)) })
            ] }, child.id);
          }
          return /* @__PURE__ */ jsx82(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx82(LinkComponent, { href: child.href || "#", className: "cursor-pointer w-full", children: child.title }) }, child.id);
        }) })
      ] }, item.id);
    }
    return /* @__PURE__ */ jsx82(
      LinkComponent,
      {
        href: item.href || "#",
        className: "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md focus-visible:ring-2 focus-visible:ring-ring outline-none",
        children: item.title
      },
      item.id
    );
  }, "renderDesktopMenuItem");
  return /* @__PURE__ */ jsx82(
    "header",
    {
      className: cn(
        "w-full z-50 transition-all duration-300",
        sticky ? "fixed top-0 md:top-6" : "relative",
        className
      ),
      children: /* @__PURE__ */ jsx82(Container, { children: /* @__PURE__ */ jsxs54(
        "div",
        {
          className: cn(
            "relative flex h-16 items-center justify-between gap-3 px-4 transition-all",
            // Mimicking the Simplifi glass card style
            "bg-background/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm"
          ),
          children: [
            /* @__PURE__ */ jsx82("div", { className: "flex items-center shrink-0", children: LogoComponent }),
            /* @__PURE__ */ jsx82("nav", { className: "hidden md:flex md:gap-1 lg:gap-2", children: data.items.map(renderDesktopMenuItem) }),
            /* @__PURE__ */ jsxs54("div", { className: "flex items-center gap-3", children: [
              slots.rightActionSlot,
              /* @__PURE__ */ jsx82("div", { className: "hidden md:flex gap-3", children: data.ctaItems?.map((cta, idx) => /* @__PURE__ */ jsx82(
                Button,
                {
                  variant: cta.variant || (cta.type === "primary" ? "primary" : "ghost"),
                  size: "sm",
                  fullWidth: false,
                  render: /* @__PURE__ */ jsx82(LinkComponent, { href: cta.href, children: cta.title }),
                  children: cta.title
                },
                idx
              )) }),
              /* @__PURE__ */ jsx82("div", { className: "md:hidden", children: /* @__PURE__ */ jsxs54(Sheet, { children: [
                /* @__PURE__ */ jsx82(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx82("button", { className: "p-2 text-muted-foreground hover:text-foreground", children: slots.menuIcon || /* @__PURE__ */ jsx82(Menu3, { className: "w-5 h-5" }) }) }),
                /* @__PURE__ */ jsxs54(SheetContent, { side: "right", className: "w-[300px] sm:w-[400px]", children: [
                  /* @__PURE__ */ jsx82(SheetHeader, { className: "px-1 text-left", children: /* @__PURE__ */ jsx82(SheetTitle, { className: "text-lg font-bold", children: "Menu" }) }),
                  /* @__PURE__ */ jsxs54("div", { className: "flex flex-col gap-6 mt-6 overflow-y-auto", children: [
                    /* @__PURE__ */ jsx82("nav", { className: "flex flex-col space-y-4", children: data.items.map((item) => /* @__PURE__ */ jsx82("div", { className: "flex flex-col gap-2", children: item.type === "link" ? /* @__PURE__ */ jsx82(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx82(
                      LinkComponent,
                      {
                        href: item.href || "#",
                        className: "text-lg font-medium text-foreground py-1",
                        children: item.title
                      }
                    ) }) : /* @__PURE__ */ jsxs54("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsx82("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: item.title }),
                      /* @__PURE__ */ jsx82("div", { className: "pl-4 flex flex-col gap-2 border-l border-border ml-1", children: item.children?.map((child) => /* @__PURE__ */ jsx82(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx82(
                        LinkComponent,
                        {
                          href: child.href || "#",
                          className: "text-base text-foreground/80 hover:text-foreground py-1",
                          children: child.title
                        }
                      ) }, child.id)) })
                    ] }) }, item.id)) }),
                    /* @__PURE__ */ jsx82("div", { className: "flex flex-col gap-3 pt-4 border-t border-border", children: data.ctaItems?.map((cta, idx) => /* @__PURE__ */ jsx82(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx82(
                      Button,
                      {
                        variant: cta.variant || "primary",
                        fullWidth: true,
                        render: /* @__PURE__ */ jsx82(LinkComponent, { href: cta.href, children: cta.title }),
                        children: cta.title
                      }
                    ) }, idx)) })
                  ] })
                ] })
              ] }) })
            ] })
          ]
        }
      ) })
    }
  );
}
__name(HeaderBlock, "HeaderBlock");

// blocks/footer/footer-block.tsx
import React47 from "react";
import { Twitter, Instagram, Facebook, Youtube, Linkedin, Hash, Github } from "lucide-react";
import { jsx as jsx83, jsxs as jsxs55 } from "react/jsx-runtime";
var DefaultLink2 = /* @__PURE__ */ __name(({ href, className, children, target, rel }) => /* @__PURE__ */ jsx83("a", { href, className, target, rel, children }), "DefaultLink");
function SocialIconRenderer({ icon }) {
  if (React47.isValidElement(icon)) return icon;
  const props = { size: 24, className: "w-5 h-5" };
  switch (icon) {
    case "twitter":
      return /* @__PURE__ */ jsx83(Twitter, { ...props });
    case "instagram":
      return /* @__PURE__ */ jsx83(Instagram, { ...props });
    case "facebook":
      return /* @__PURE__ */ jsx83(Facebook, { ...props });
    case "youtube":
      return /* @__PURE__ */ jsx83(Youtube, { ...props });
    case "linkedin":
      return /* @__PURE__ */ jsx83(Linkedin, { ...props });
    case "github":
      return /* @__PURE__ */ jsx83(Github, { ...props });
    // Added github
    case "threads":
      return /* @__PURE__ */ jsx83(Hash, { ...props });
    default:
      return null;
  }
}
__name(SocialIconRenderer, "SocialIconRenderer");
function FooterBlock({
  data,
  slots = {},
  className,
  border = false
}) {
  const LinkComponent = slots.linkComponent || DefaultLink2;
  const LogoComponent = slots.logo || /* @__PURE__ */ jsx83(Logo, {});
  const { branding, columns, social, legal } = data;
  return /* @__PURE__ */ jsxs55("footer", { className: cn("bg-background text-foreground", className), children: [
    /* @__PURE__ */ jsx83(Container, { children: /* @__PURE__ */ jsxs55(
      "div",
      {
        className: cn(
          "grid gap-10 py-8 sm:grid-cols-12 md:py-12",
          border && "border-t border-border"
        ),
        children: [
          /* @__PURE__ */ jsxs55("div", { className: "space-y-4 sm:col-span-12 lg:col-span-4", children: [
            /* @__PURE__ */ jsx83("div", { className: "-ml-3 flex items-center", children: LogoComponent }),
            /* @__PURE__ */ jsxs55("div", { className: "text-sm text-muted-foreground", children: [
              "\xA9 ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " ",
              branding.brandName,
              " by",
              " ",
              branding.brandUrl ? /* @__PURE__ */ jsx83(
                LinkComponent,
                {
                  href: branding.brandUrl,
                  className: "font-medium hover:text-foreground transition-colors",
                  target: "_blank",
                  children: branding.brandName
                }
              ) : /* @__PURE__ */ jsx83("span", { className: "font-medium", children: branding.brandName }),
              ". ",
              branding.copyrightText
            ] }),
            legal && legal.length > 0 && /* @__PURE__ */ jsx83("div", { className: "text-sm text-muted-foreground flex flex-wrap gap-2", children: legal.map((item, index) => /* @__PURE__ */ jsxs55("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx83(LinkComponent, { href: item.href, className: "hover:text-foreground transition-colors", children: item.title }),
              index < legal.length - 1 && /* @__PURE__ */ jsx83("span", { className: "opacity-50", children: "|" })
            ] }, index)) })
          ] }),
          columns.map((col, idx) => /* @__PURE__ */ jsxs55("div", { className: "space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2", children: [
            /* @__PURE__ */ jsx83("h3", { className: "text-sm font-semibold tracking-wider uppercase text-foreground", children: col.title }),
            /* @__PURE__ */ jsx83("ul", { className: "space-y-2.5 text-sm", children: col.links.map((link, lIdx) => /* @__PURE__ */ jsx83("li", { children: /* @__PURE__ */ jsx83(
              LinkComponent,
              {
                href: link.href,
                className: "text-muted-foreground transition hover:text-foreground hover:underline",
                children: link.title
              }
            ) }, lIdx)) })
          ] }, idx)),
          /* @__PURE__ */ jsxs55("div", { className: "space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2", children: [
            /* @__PURE__ */ jsx83("h3", { className: "text-sm font-semibold tracking-wider uppercase text-foreground", children: "Social" }),
            social && /* @__PURE__ */ jsx83("ul", { className: "flex flex-wrap gap-3 items-center", children: social.map((item, idx) => /* @__PURE__ */ jsx83("li", { children: /* @__PURE__ */ jsx83(
              LinkComponent,
              {
                href: item.href,
                className: "flex items-center justify-center text-muted-foreground transition hover:text-primary",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": item.name,
                children: /* @__PURE__ */ jsx83(SocialIconRenderer, { icon: item.icon })
              }
            ) }, idx)) })
          ] })
        ]
      }
    ) }),
    slots.bottomIllustration && /* @__PURE__ */ jsx83("div", { className: "w-full overflow-hidden", "aria-hidden": "true", children: slots.bottomIllustration })
  ] });
}
__name(FooterBlock, "FooterBlock");
export {
  Accordion,
  AccordionGroup,
  Alert,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AppProvider,
  AspectRatio,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  ButtonGroupSeparator,
  ButtonTooltip,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDecorator,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardSkeleton,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Chip,
  ClassicDropdown,
  Collapsible,
  CollapsibleContent,
  CollapsibleSection,
  CollapsibleTrigger,
  ColorInput,
  ColorsPanel,
  Combobox,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Container,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DashboardCard,
  DatePicker,
  DatePickerRange,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DropdownIconMenu,
  DropdownMenu,
  DropdownMenuAction,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSectionLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownProfile,
  DropdownSelect,
  Empty,
  ErrorBoundary,
  ErrorFallback,
  Field,
  FileInput,
  FooterBlock,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Grid,
  Header,
  HeaderBlock,
  Heading,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  ICON_DEFAULT_SIZE,
  ICON_DEFAULT_STROKE_WIDTH,
  ICON_SIZES,
  Icon,
  ImportModal,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSingle,
  InputOTPSlot,
  Kbd,
  Label,
  LayoutTab,
  Lead,
  LoadingSpinner,
  Logo,
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  Modal,
  Muted,
  NativeSelect,
  Navbar,
  NavigationMenuRoot as NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  OtherPanel,
  Page,
  Pagination,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Radio,
  RadioGroup,
  RadioGroupItem,
  Tooltip as RadixTooltip,
  TooltipContent as RadixTooltipContent,
  TooltipProvider as RadixTooltipProvider,
  TooltipTrigger as RadixTooltipTrigger,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ResponsiveDialog,
  RichTextEditor,
  ScrollArea,
  ScrollBar,
  Section,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator2 as Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarLink,
  SidebarLinkGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SimpleCard,
  Skeleton,
  Slider,
  Small,
  Stack,
  StatCard,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  TabsWithContainer,
  Text,
  Textarea,
  ThemeCustomizer,
  ThemeTab,
  ThemeToggleIcon,
  Toaster3 as Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip3 as Tooltip,
  TypographyPanel,
  announceToScreenReader,
  applyImportedTheme,
  applyRadius,
  applyThemePreset,
  baseColors,
  cn,
  colorGroups,
  colorThemes,
  combine,
  conditional,
  createIcon,
  createKeyframe,
  createRule,
  createStandardProps,
  createVariants,
  debounce,
  doubleRaf,
  email,
  focusFirstElement,
  focusLastElement,
  focusNextElement,
  focusPreviousElement,
  generateId,
  getAccessibleName,
  getAriaDescribedBy,
  getAriaLabel,
  getFocusableElements,
  getRespectfulDuration,
  getTransitionClass,
  handleColorChange,
  isFocusable,
  isVisibleToScreenReader,
  max,
  maxLength,
  min,
  minLength,
  navigationMenuTriggerClass,
  numberRange,
  pattern,
  radiusOptions,
  raf,
  required,
  resetTheme,
  shouldReduceMotion,
  themePresets,
  throttle,
  toast,
  toastSemantic,
  toggleVariants,
  url,
  useAppProvider,
  useAriaLive,
  useAsyncState,
  useBreakpoint,
  useClickOutside,
  useCounter,
  useDebounce,
  useErrorHandler,
  useFocusReturn,
  useFocusTrap,
  useFormField,
  useFormValidation,
  useMediaQuery,
  usePrefersReducedMotion,
  useThemeManager,
  useThrottle,
  useToggle,
  useTransitionState,
  useWindowWidth,
  variantClassNames
};
//# sourceMappingURL=index.mjs.map