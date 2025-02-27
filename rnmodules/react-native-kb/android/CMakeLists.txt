cmake_minimum_required(VERSION 3.9.0)

set (PACKAGE_NAME "cpp")
set (CMAKE_VERBOSE_MAKEFILE ON)

set (BUILD_DIR ${CMAKE_SOURCE_DIR}/build)

set (CMAKE_CXX_FLAGS "-fexceptions -fno-omit-frame-pointer -frtti -Wno-sign-compare")
set (CMAKE_C_FLAGS_DEBUG "${CMAKE_C_FLAGS_DEBUG} -g")
set (CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -g")
set (NODE_MODULES_DIR "${CMAKE_SOURCE_DIR}/../../../shared/node_modules")

file(GLOB LIBRN_DIR "${RN_SO_DIR}/${ANDROID_ABI}")
if (NOT LIBRN_DIR)
    # If /${ANDROID_ABI} dir not found, then ${RN_SO_DIR} is probably:
    # ReactAndroid/build/react-ndk/exported
    file(GLOB LIBRN_DIR "${RN_SO_DIR}")
endif()

file(GLOB libfbjni_include_DIRS "${BUILD_DIR}/fbjni-*-headers.jar/")

message(INFO "params: ${REACT_NATIVE_DIR} ${RN_SO_DIR}")

add_library(${PACKAGE_NAME}
            SHARED
            ../cpp/rpc.cpp
            cpp-adapter.cpp
)

set_target_properties(
        ${PACKAGE_NAME} PROPERTIES
        CXX_STANDARD 17
        CXX_EXTENSIONS OFF
        POSITION_INDEPENDENT_CODE ON
)
file (GLOB LIBFBJNI_INCLUDE_DIR ${FBJNI_HEADERS_DIR})

# Specifies a path to native header files.
target_include_directories(
    ${PACKAGE_NAME}
    PRIVATE
    ../cpp
    "${REACT_NATIVE_DIR}/React"
    "${REACT_NATIVE_DIR}/React/Base"
    "${REACT_NATIVE_DIR}/ReactAndroid/src/main/jni"
    "${REACT_NATIVE_DIR}/ReactAndroid/src/main/jni/react/turbomodule"
    "${REACT_NATIVE_DIR}/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/jni"
    "${REACT_NATIVE_DIR}/ReactCommon"
    "${REACT_NATIVE_DIR}/ReactCommon/callinvoker"
    "${REACT_NATIVE_DIR}/ReactCommon/jsi"
    ${libfbjni_include_DIRS}
    "${NODE_MODULES_DIR}/msgpack-cxx-4.1.1/include"
)

find_library(LOG_LIB log)

find_library(
        FBJNI_LIB
        fbjni
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

find_library(
        JSI_LIB
        jsi
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

find_library(
        REACT_NATIVE_JNI_LIB
        reactnativejni
        PATHS ${LIBRN_DIR}
        NO_CMAKE_FIND_ROOT_PATH
)

add_definitions(-DMSGPACK_NO_BOOST)

target_link_libraries(
        ${PACKAGE_NAME}
        ${LOG_LIB}
        ${FBJNI_LIB}
        ${JSI_LIB}
        ${REACT_NATIVE_JNI_LIB}
        android
)
