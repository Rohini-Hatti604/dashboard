'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@clean-start-dashboard/api documentation</a>
                </li>

                <li class="divider"></li>
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ''}
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#modules-links"'
                                : 'data-bs-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                            : 'data-bs-target="#xs-controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                            : 'id="xs-controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                        : 'data-bs-target="#xs-injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                        : 'id="xs-injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"'
                                            : 'data-bs-target="#xs-controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"'
                                            : 'id="xs-controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CachingModule.html" data-type="entity-link" >CachingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"'
                                        : 'data-bs-target="#xs-injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"'
                                        : 'id="xs-injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/CachingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CachingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardCategoryModule.html" data-type="entity-link" >DashboardCategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                            : 'data-bs-target="#xs-controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                            : 'id="xs-controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/DashboardCategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardCategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                        : 'data-bs-target="#xs-injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                        : 'id="xs-injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/DashboardCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardCategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                            : 'data-bs-target="#xs-controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                            : 'id="xs-controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                        : 'data-bs-target="#xs-injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                        : 'id="xs-injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/DashboardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardProfileModule.html" data-type="entity-link" >DashboardProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                            : 'data-bs-target="#xs-controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                            : 'id="xs-controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/DashboardProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardProfileController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                        : 'data-bs-target="#xs-injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                        : 'id="xs-injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/DashboardProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GrpcModule.html" data-type="entity-link" >GrpcModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"'
                                        : 'data-bs-target="#xs-injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"'
                                        : 'id="xs-injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/GrpcService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GrpcService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OpenSearchModule.html" data-type="entity-link" >OpenSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                            : 'data-bs-target="#xs-controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                            : 'id="xs-controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/OpenSearchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenSearchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                        : 'data-bs-target="#xs-injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                        : 'id="xs-injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/OpenSearchClientProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenSearchClientProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OpenSearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenSearchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                            : 'data-bs-target="#xs-controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                            : 'id="xs-controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                        : 'data-bs-target="#xs-injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                        : 'id="xs-injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserVariableModule.html" data-type="entity-link" >UserVariableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                            : 'data-bs-target="#xs-controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                            : 'id="xs-controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/UserVariableController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserVariableController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                        : 'data-bs-target="#xs-injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                        : 'id="xs-injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/UserVariableService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserVariableService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WidgetModule.html" data-type="entity-link" >WidgetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-bs-target="#controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                            : 'data-bs-target="#xs-controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                        }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                            : 'id="xs-controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                        }>
                                            <li class="link">
                                                <a href="controllers/WidgetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                        : 'data-bs-target="#xs-injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                        : 'id="xs-injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/WidgetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#controllers-links"'
                                : 'data-bs-target="#xs-controllers-links"'
                            }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"'}>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DashboardCategoryController.html" data-type="entity-link" >DashboardCategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DashboardController.html" data-type="entity-link" >DashboardController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DashboardProfileController.html" data-type="entity-link" >DashboardProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OpenSearchController.html" data-type="entity-link" >OpenSearchController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RoleController.html" data-type="entity-link" >RoleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserVariableController.html" data-type="entity-link" >UserVariableController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/WidgetController.html" data-type="entity-link" >WidgetController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#injectables-links"'
                                : 'data-bs-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CachingService.html" data-type="entity-link" >CachingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardCategoryService.html" data-type="entity-link" >DashboardCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardProfileService.html" data-type="entity-link" >DashboardProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardService.html" data-type="entity-link" >DashboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GrpcService.html" data-type="entity-link" >GrpcService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OpenSearchClientProvider.html" data-type="entity-link" >OpenSearchClientProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OpenSearchService.html" data-type="entity-link" >OpenSearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserVariableService.html" data-type="entity-link" >UserVariableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WidgetService.html" data-type="entity-link" >WidgetService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#guards-links"'
                            : 'data-bs-target="#xs-guards-links"'
                        }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"'}>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#interfaces-links"'
                            : 'data-bs-target="#xs-interfaces-links"'
                        }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"'}>
                            <li class="link">
                                <a href="interfaces/Aggregation.html" data-type="entity-link" >Aggregation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddToFavouriteRequest.html" data-type="entity-link" >IAddToFavouriteRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAggs.html" data-type="entity-link" >IAggs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthHeaders.html" data-type="entity-link" >IAuthHeaders</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateDashboardCategoryRequest.html" data-type="entity-link" >ICreateDashboardCategoryRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateDashboardRequest.html" data-type="entity-link" >ICreateDashboardRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateRoleRequest.html" data-type="entity-link" >ICreateRoleRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateUserVariableRequest.html" data-type="entity-link" >ICreateUserVariableRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateWidgetRequest.html" data-type="entity-link" >ICreateWidgetRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetDashboard.html" data-type="entity-link" >IGetDashboard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetDashboardCategory.html" data-type="entity-link" >IGetDashboardCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetDashboardCategoryRequest.html" data-type="entity-link" >IGetDashboardCategoryRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetDashboardProfile.html" data-type="entity-link" >IGetDashboardProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetDashboardRequest.html" data-type="entity-link" >IGetDashboardRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetQueryDataFilter.html" data-type="entity-link" >IGetQueryDataFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetQueryDataRequest.html" data-type="entity-link" >IGetQueryDataRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetRole.html" data-type="entity-link" >IGetRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetRoleRequest.html" data-type="entity-link" >IGetRoleRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetUserVariable.html" data-type="entity-link" >IGetUserVariable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetUserVariableRequest.html" data-type="entity-link" >IGetUserVariableRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetWidget.html" data-type="entity-link" >IGetWidget</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGetWidgetRequest.html" data-type="entity-link" >IGetWidgetRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IListEntitiesRequest.html" data-type="entity-link" >IListEntitiesRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IListEntitiesResponse.html" data-type="entity-link" >IListEntitiesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceResponse.html" data-type="entity-link" >InterfaceResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceService.html" data-type="entity-link" >InterfaceService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchQueryRequestPayload.html" data-type="entity-link" >ISearchQueryRequestPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISetDefaultDashbordRequest.html" data-type="entity-link" >ISetDefaultDashbordRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateDashboardCategoryRequest.html" data-type="entity-link" >IUpdateDashboardCategoryRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateDashboardRequest.html" data-type="entity-link" >IUpdateDashboardRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateRoleRequest.html" data-type="entity-link" >IUpdateRoleRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateUserVariableRequest.html" data-type="entity-link" >IUpdateUserVariableRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateWidgetRequest.html" data-type="entity-link" >IUpdateWidgetRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MappingInput.html" data-type="entity-link" >MappingInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Output.html" data-type="entity-link" >Output</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProcessNode.html" data-type="entity-link" >ProcessNode</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  },
);
