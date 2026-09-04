#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// LernomiSpeech.swift'i RN'e tanıtır (RCT_EXTERN_MODULE). Android'deki LernomiSpeechModule
// ile aynı yöntemler/olaylar.
@interface RCT_EXTERN_MODULE(LernomiSpeech, RCTEventEmitter)

RCT_EXTERN_METHOD(start:(NSString *)locale
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isAvailable:(NSString *)locale
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(hasMicrophone:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setKeepAwake:(BOOL)on)
RCT_EXTERN_METHOD(startRecording:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopRecording:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setApiBase:(NSString *)base)
RCT_EXTERN_METHOD(uploadStt:(NSString *)url
                  wavPath:(NSString *)wavPath
                  language:(NSString *)language
                  expected:(NSString *)expected
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(httpGet:(NSString *)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startWalkService)
RCT_EXTERN_METHOD(stopWalkService)
RCT_EXTERN_METHOD(startScreenWatch)
RCT_EXTERN_METHOD(stopScreenWatch)
RCT_EXTERN_METHOD(stop)
RCT_EXTERN_METHOD(cancel)
RCT_EXTERN_METHOD(destroy)

@end
